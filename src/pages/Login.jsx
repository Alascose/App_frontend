import Button from "../components/Button";
export default function Login() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md items-center justify-center p-10 hover:shadow-2xl transition duration-300">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Connexion
        </h1>
        <form className="flex flex-col space-y-5 p-4">
          <input
            type="email"
            placeholder="Enter votre email"
            className="border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 p-4"
          />
          <input
            type="password"
            placeholder="Enter votre mot de passe"
            className="border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 p-4"
          />
          <Button color="blue">Se connecter</Button>
        </form>
      </div>
    </div>
  );
}
