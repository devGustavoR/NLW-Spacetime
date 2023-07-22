import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemorie(){
return(
  <div className="flex flex-1 flex-col gap-4">
    <Link href="/" className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100">
      <ChevronLeft className="w-4 h-4"/>
      Voltar para a timeline
    </Link>

    <form className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label htmlFor="media" className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
          <Camera className="w-4 h-4"/>
          Anexar mídia
        </label>

        <label htmlFor="isPublic" className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
          <input type="checkbox" name="isPublic" id="isPublic" value="true"/>
          Tornar mémoria pública
        </label>
      </div>
      <input type="file" id="media" className="invisible" />
    </form>
  </div>
)
}