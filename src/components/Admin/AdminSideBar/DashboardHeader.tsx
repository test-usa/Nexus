export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center h-16 gap-4 border-b px-6">
      <div className="max-w-16">
        <img
          src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
          alt="logo"
        />
      </div>

      <div className="flex items-center justify-endh-16 gap-4  px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocJYO2z0aV3cT15IeV9_txuD04rcmJOVffuQD2WhH9OHs75WOyk=s288-c-no"
              alt="Profile picture"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="text-sm">
            <p className="font-medium">Admin_Arfin Mia</p>
            <p className="text-xs text-gray-500">arfin.cse.edu.bd@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
