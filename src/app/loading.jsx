export default function Loading() {
  return (
    <div className="flex absolute top-0 left-0 w-full h-full items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="animate-pulse text-sm font-medium text-slate-500">
          Sincronizando con SIGACE...
        </p>
      </div>
    </div>
  );
}
