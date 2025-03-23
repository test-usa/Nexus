import { Button } from "@/components/ui/button";

export default function DownloadScript() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Install Exodus</h2>
      <p className="mb-2">Step 1: Install Tampermonkey</p>
      <a
        href="https://www.tampermonkey.net/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Download Tampermonkey
      </a>
      <p className="mt-4 mb-2">Step 2: Install Exodus Script</p>
      <Button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => window.open("/exodus.user.js", "_blank")}
      >
        Download Script
      </Button>
    </div>
  );
}
