import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";

export default function Home() {
  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 mb-20">
      {/* <h1>Threads</h1>
      <UserButton afterSignOutUrl="/"/>
      <Button>Click me</Button> */}


      <section className="nav-padding w-full">
        <div className="flex-center relative  w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">JavaScript Mastery Resources</h1>
        </div>
        <SearchForm />
      </section>

      <Filters />
    </main>
  );
}
