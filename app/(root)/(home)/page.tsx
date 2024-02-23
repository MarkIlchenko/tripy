import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";
import { getResources, getResourcesPlaylist } from "@/sanity/actions";
import ResourceCard from "@/components/ResourceCard";
import Header from "@/components/Header";


export const revalidate = 900;

interface Props {
  searchParams: { [key: string]: string | undefined }
}

export default async function Page({ searchParams }: Props) {
  const resources = await getResources({
    query: searchParams?.query || '',
    category: searchParams?.category || '',
    page: '1'
  })

  const resourcesPlaylist = await getResourcesPlaylist();

  console.log(resources);

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col mt-10 mb-20 sm:px-10 flex-wrap">
      {/* <h1>Threads</h1>
      <UserButton afterSignOutUrl="/"/>
      <Button>Click me</Button> */}


      <section className="nav-padding w-full relative">
        <div className="flex-center relative  w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white flex w-full justify-center flex-col h-full">JavaScript Mastery Resources</h1>
        </div>
        <SearchForm />
      </section>

      <Filters />

      {(searchParams?.query || searchParams?.category) && (
        <section className="mt-6 w-full flex flex-col sm:mt-20">
          <Header
            title="Resources"
            query={searchParams?.query || ''}
            category={searchParams?.category || ''}
          />

          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? (
              resources.map((resource: any) => (
                <ResourceCard 
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  downloadNumber={resource.views}
                  downloadLink={resource.downloadLink}
                />
              ))
            ): (
              <p className="body-regular text-white">
                No resources found
              </p>
            )}
          </div>
        </section>
      )}

      {resourcesPlaylist.map((item: any) => (
        <section key={item._id} className="flex items-center mt-6 w-full flex-col sm:mt-20">
          <h1 className="self-start heading2 text-white">{item.title}</h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.resources.map((resource: any) => (
                <ResourceCard 
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  downloadNumber={resource.views}
                  downloadLink={resource.downloadLink}
                />
              ))}
          </div>
        </section>
      ))}

    </main>
  );
}
