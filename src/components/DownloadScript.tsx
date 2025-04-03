import { Button } from "@/components/ui/button";

export default function DownloadScript() {
  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-[var(--color-textcolor)]">
        Install Exodus
      </h2>

      <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-500 transition-all duration-300 transform perspective-1000 hover:scale-115 hover:translate-z-20">
        <a
          href="https://www.tampermonkey.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-hovertext)] underline"
        >
          <img
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="Profile picture"
            className="object-cover"
          />
        </a>
      </div>

      <Button
        className="bg-green-500 text-white px-8 mt-5 mb-5 py-5 rounded"
        onClick={() => window.open("/exodus.user.js", "_blank")}
      >
        Download Script
      </Button>
      <div>
        <p className="mt-4 mb-2">Step 2: Install Exodus Script</p>
        <p className="mb-2">Step 1: Install Tampermonkey</p>
      </div>
    </div>
  );
}
