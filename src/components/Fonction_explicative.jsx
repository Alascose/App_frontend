import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCreanceSolde = async (req, res) => {
  const creanceId = Number(req.body.creanceId);
  const montantPaiement = Number(req.body.montantVerse);

  if (!Number.isInteger(creanceId) || creanceId <= 0) {
    return res.status(400).json({
      message: "Identifiant de créance invalide",
    });
  }

  if (!Number.isFinite(montantPaiement) || montantPaiement <= 0) {
    return res.status(400).json({
      message: "Le montant doit être supérieur à zéro",
    });
  }

  try {
    const resultat = await prisma.$transaction(async (tx) => {
      const creance = await tx.creance.findUnique({
        where: { id: creanceId },
      });

      if (!creance) {
        const erreur = new Error("Créance introuvable");
        erreur.statusCode = 404;
        throw erreur;
      }

      // Calcul des montants
      const montantTotal = creance.montantTotal;
      const dejaVerse = creance.montantVerse ?? 0;
      const reste = creance.montantRestant ?? montantTotal - dejaVerse;

      if (montantPaiement > reste) {
        const erreur = new Error(
          "Le paiement dépasse le montant restant à payer",
        );
        erreur.statusCode = 400;
        throw erreur;
      }

      const nouveauVerse = dejaVerse + montantPaiement;
      const nouveauReste = Math.max(0, reste - montantPaiement);

      const statut = nouveauReste === 0 ? "Soldée" : "Partiellement payée";

      // Enregistrement du paiement dans l'historique
      const historique = await tx.creanceSolde.create({
        data: {
          creanceId: creance.id,
          clientId: creance.clientId,
          produitId: creance.produitId,
          quantite: creance.quantite,
          montantTotal,
          montantVerse: montantPaiement,
          montantRestant: nouveauReste,
        },
      });

      // Mise à jour de la créance principale
      const creanceActualisee = await tx.creance.update({
        where: { id: creance.id },
        data: {
          montantVerse: nouveauVerse,
          montantRestant: nouveauReste,
          statusCreance: statut,
        },
        include: {
          client: true,
          produit: true,
        },
      });

      return { historique, creance: creanceActualisee };
    });

    return res.status(201).json({
      message: "Paiement enregistré avec succès",
      historique: resultat.historique,
      creance: resultat.creance,
    });
  } catch (error) {
    const statusCode = error.statusCode ?? 500;

    return res.status(statusCode).json({
      message:
        statusCode === 500
          ? "Erreur lors de l'enregistrement du paiement"
          : error.message,
      ...(statusCode === 500 ? { error: error.message } : {}),
    });
  }
};
