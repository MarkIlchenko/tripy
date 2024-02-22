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
         
         <CardContent className="flex-between mt-4 p-0">
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
         </CardContent>
      </Card>
  )
}

export default ResourceCard