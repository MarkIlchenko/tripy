import ResourceCard from '@/components/ResourceCard';
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
    return <div>Ресурс не найден</div>;
  }

  // Отображение выбранного ресурса
  return (
    <div>
      <ResourceCard 
        key={selectedResource._id}
        title={selectedResource.title}
        id={selectedResource._id}
        image={selectedResource.image}
        downloadNumber={selectedResource.views}
        downloadLink={selectedResource.downloadLink}
      />
    </div>
  );
};

export default page;
