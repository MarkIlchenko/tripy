import ResourceCard from '@/components/ResourceCard';
import WeatherComponent from '@/components/WeatherComponent';
import { getResourcesPlaylist } from '@/sanity/actions';
import { currentUser } from '@clerk/nextjs';

interface Resource {
  _id: string;
  title: string;
  image: string;
  views: number;
  downloadLink: string;
}

interface PlaylistItem {
  _id: string;
  title: string;
  resources: Resource[];
}

const page = async ({ params }: { params: { id: string }}) => {
  // Получение списка ресурсов
  const resourcesPlaylist: PlaylistItem[] = await getResourcesPlaylist();
  
  // Извлечение id из параметров запроса
  const { id } = params;

  // Фильтрация ресурсов, оставляем только тот, который соответствует переданному id
  const selectedResource = resourcesPlaylist.flatMap(item => item.resources).find(resource => resource._id === id);

  // Проверка на существование выбранного ресурса
  if (!selectedResource) {
    return <div>Ресурс не найден </div>;
  }

  // Получение текущей даты и даты через 7 дней
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  // Форматирование дат в формате YYYY-MM-DD
  const formattedToday = formatDate(today);
  const formattedNextWeek = formatDate(nextWeek);

  // Отображение выбранного ресурса
  return (
    <div className="flex justify-between mx-auto w-full max-w-screen-2xl  mt-10 mb-20">
      <ResourceCard 
        key={selectedResource._id}
        title={selectedResource.title}
        id={selectedResource._id}
        image={selectedResource.image}
        downloadNumber={selectedResource.views}
        downloadLink={selectedResource.downloadLink}
      />

      <section className="mt-6 mr-auto ml-20 flex flex-col items-start">
          <h2 className="self-start heading2 text-white">Weather in {selectedResource.title}:</h2>
          <WeatherComponent city={selectedResource.title} startDate={`${formattedToday}`} endDate={`${formattedNextWeek}`}/>
        </section>
    </div>
  );
};

export default page;
