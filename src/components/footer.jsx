import profile from "../assets/profile.jpeg";

function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-600">

      <img
        src={profile}
        alt="Developer"
        className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 shadow-lg"
      />

      <p className="font-medium">
        by
      </p>

      <p>
        Falodun Eniola Grace (FAT/20/4424)
      </p>

    </footer>
  );
}

export default Footer;