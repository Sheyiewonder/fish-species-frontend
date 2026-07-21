import profile from "../assets/profile.jpeg";

function Footer() {
  return (
    <footer className="mt-12 text-center text-gray-600">

      <img
        src={profile}
        alt="Developer"
        className="w-38 h-38 object-cover rounded-2xl border-4 border-blue-500 shadow-md"
      />

      <p className="font-medium">
        by
      </p>

      <p>
        Falodun Eniola Grace
      </p>
      <p>
      (FAT/20/4424)
      </p>
    

    </footer>
  );
}

export default Footer;
