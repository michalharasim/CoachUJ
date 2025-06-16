import {useState} from "react";
import {TableCell, TableHead, TableHeader, TableRow, Table, TableBody} from "@/components/ui/table";
import {ChevronDown, ChevronUp} from "lucide-react";
import ExerciseDetailsModal from "@/components/workouts/ExerciseDetailsModal";

type ExerciseTableRowProps = {
    exerciseName: string;
    exerciseID: string;
    reps: number[];
    weight: number[];
    notes: string;
    breakTime: number;
    actualSets?: number;
    actualWeight?: number[];
    actualReps?: number[];
    actualBreakTime?: number;
}

const ExerciseTableRow = ({
    exerciseName,
    exerciseID,
    reps,
    weight,
    notes,
    breakTime,
    actualWeight,
    actualReps,
    actualBreakTime,
                          } : ExerciseTableRowProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const hasLogs = actualReps && actualReps.length > 0;

    return (
        <>
            <TableRow className="cursor-pointer">
                <ExerciseDetailsModal exerciseID={exerciseID}>
                    <TableCell
                        className="text-left text-xs md:text-md font-semibold underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {exerciseName}
                    </TableCell>
                </ExerciseDetailsModal>


                <TableCell className="hidden md:table-cell text-left">{notes}</TableCell>
                <TableCell className="hidden md:table-cell text-left">{reps.length}</TableCell>
                <TableCell className="text-left">{breakTime}</TableCell>
                <TableCell onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </TableCell>
            </TableRow>
            {isOpen && (
            <TableRow>
                <TableCell colSpan={5}>
                    <Table className="w-1/2 mx-auto">
                        <TableHeader className="">
                            <TableRow>
                                <TableHead className="text-center">Seria</TableHead>
                                <TableHead className="text-center">Powtórzenia <span className="hidden md:block">(rzeczywiste/plan)</span></TableHead>
                                <TableHead className="text-center">Ciężar <span className="hidden md:block">(rzeczywiste/plan)</span></TableHead>
                                <TableHead className="text-center">Przerwa <span className="hidden md:block">(rzeczywista)</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reps.map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="text-center">
                                        {hasLogs ? actualReps && actualReps[index]: 0} / {reps[index]}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {hasLogs ? actualWeight && actualWeight[index] : 0} / {weight[index]}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {hasLogs ? actualBreakTime : 0}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableCell>
            </TableRow>
            )}
        </>
    )
}

export default ExerciseTableRow;