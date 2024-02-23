import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";
 

interface Props {
    id: string;
    title: string;
    image: string;
    downloadNumber: number;
    downloadLink: string
}

const ResourceCard = ({ id, title, image, downloadNumber, downloadLink, }: Props) => {
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

  return (
      <Card className="w-full max-w-fit border-0 !bg-transparent sm:max-w-[356px]">
         <Link href={`/sanity-post/${id}`}>
            <CardHeader className="flex-center flex-col gap-2.5 !p-0">
               <div className="h-fit w-full">
                  <Image 
                     src={image}
                     className="h-full rounded-md object-cover"
                     width={384}
                     height={440}
                     alt={title}
                  />
               </div>

               <CardTitle className="text-white w-full text-left line-clamp-1">{title}</CardTitle>
            </CardHeader>
         </Link>
         
         {/* <CardContent className="flex-between mt-4 p-0">
            <div className="flex items-center gap-1.5 text-white">
               <Image
                  src="/temp/downloads.svg" width={20} height={20}
                  alt="download" 
               />
               {`${downloadNumber}`}
            </div>
            <Link href={downloadLink} target="_blank" className="flex items-center text-gradient_blue-purple font-bold gap-1.5">
               Download Now
               <Image src="/arrow-blue.svg" width={13} height={10} alt="arrow" />
            </Link>
         </CardContent> */}

            <div className="flex gap-1.5 text-white w-full ml-auto mt-2">
              {formattedToday} - {formattedNextWeek}
            </div>
      </Card>
  )
}

export default ResourceCard