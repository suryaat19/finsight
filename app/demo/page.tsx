import { Entrytext } from "@/components/entryText";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-full gap-6 px-4">
        
        <div className="flex flex-col items-center gap-4 mt-12">
          <Entrytext text="finsight" />
        </div>

      </main>

    </>
  );
}