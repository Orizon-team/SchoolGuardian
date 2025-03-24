import { SearchField } from "@/components/ui/search_Field";
import { ClassCardTeacher, ClassCardStudent } from "@/components/ui/class_card";
import { FillButton } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TeacherDashboard() {
  return (
    <section className="flex flex-col gap-y-4 px-40 py-10">
      <h1 className="text-primaryOri text-3xl-ori font-bold">Dashboard</h1>
      <p className="text-greyOri-400">Lunes, Marzo 17, 2025</p>
      <div className="flex gap-4 justify-between">
        <div className="w-1/3">
          <SearchField placeHolder="Buscar clase" />
        </div>
        <FillButton
          text="Clase nueva"
          isFlex={true}
          isFullWidth={true}
          paddingX="px-40"
          isWithIcon={true}
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-8">
        <ClassCardStudent
          nameClass="Matemáticas"
          description="Fundamentos del cálculo "
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        {/* otra clase inventada */}
        <ClassCardTeacher
          nameClass="Física"
          description="Fundamentos de la física"
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        {/* otra clase inventada */}
        <ClassCardTeacher
          nameClass="Química"
          description="Fundamentos de la química"
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        <ClassCardTeacher
          nameClass="Matemáticas"
          description="Fundamentos del cálculo "
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        {/* otra clase inventada */}
        <ClassCardTeacher
          nameClass="Física"
          description="Fundamentos de la física"
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        {/* otra clase inventada */}
        <ClassCardTeacher
          nameClass="Química"
          description="Fundamentos de la química"
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        <ClassCardTeacher
          nameClass="Matemáticas"
          description="Fundamentos del cálculo "
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        {/* otra clase inventada */}
        <ClassCardTeacher
          nameClass="Física"
          description="Fundamentos de la física"
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
        {/* otra clase inventada */}
        <ClassCardTeacher
          nameClass="Química"
          description="Fundamentos de la química"
          duration={100}
          schedule="9:00 p.m"
          numberOfStudents={29}
          days="Lunes, Martes"
          codeClass="NMCU34"
          teacherName=""
        />
      </div>
    </section>
  );
}
