import {useState} from "react";
import {TableCell, TableHead, TableHeader, TableRow, Table, TableBody} from "@/components/ui/table";
import {ChevronDown, ChevronUp} from "lucide-react";
import ExerciseDetailsModal from "@/components/workouts/ExerciseDetailsModal";
import type {Exercise} from "@/lib/types";
import {formatSecondsToMinutesAndSeconds} from "@/lib/utils";
import {type Control, Controller} from "react-hook-form";
import {Input} from "@/components/ui/input";

type ExerciseTableRowProps = {
    exercise: Exercise;
    reps: string[];
    weight: number[];
    breakTime: number;
    actualSets?: number;
    actualWeight?: number[];
    actualReps?: string[];
    actualBreakTime?: number[];
    control: Control<any>;
    exerciseIndex: number;
    isCoach: boolean;
}

const ExerciseTableRow = ({
    exercise,
    reps,
    weight,
    breakTime,
    actualWeight,
    actualReps,
    actualBreakTime,
    control,
    exerciseIndex,
    isCoach,
                          } : ExerciseTableRowProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow className="cursor-pointer">
                <ExerciseDetailsModal exercise={exercise}>
                    <TableCell
                        className="text-left text-xs md:text-md font-semibold underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {exercise.name}
                    </TableCell>
                </ExerciseDetailsModal>


                <TableCell className="hidden md:table-cell text-left">{reps.length}</TableCell>
                <TableCell className="text-left">{formatSecondsToMinutesAndSeconds(breakTime)}</TableCell>
                <TableCell onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </TableCell>
            </TableRow>
            {isOpen && (
            <TableRow>
                <TableCell colSpan={5}>
                    <Table className="lg:w-2/3 mx-auto">
                        <TableHeader className="">
                            <TableRow>
                                <TableHead className="text-center">Seria</TableHead>
                                <TableHead className="text-center">Powtórzenia <span className="hidden md:block">(rzeczywiste/plan)</span></TableHead>
                                <TableHead className="text-center">Ciężar <span className="hidden md:block">(rzeczywiste/plan)</span></TableHead>
                                <TableHead className="text-center">Przerwa <span className="hidden md:block">(rzeczywista)</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reps.map((plannedRep, setIndex) => (
                                <TableRow key={exerciseIndex + "_" + setIndex}>
                                    <TableCell>{setIndex + 1}</TableCell>
                                    <TableCell className="text-center">
                                        {!isCoach ? (
                                            <Controller
                                                name={`log_exercises.${exerciseIndex}.actualReps.${setIndex}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <span className="flex flex-row gap-2 justify-center">
                                                        <Input
                                                            type="text"
                                                            placeholder={reps[setIndex]}
                                                            {...field}
                                                            className="text-center w-24 h-7"
                                                        />
                                                        / {plannedRep}
                                                    </span>
                                                )}
                                            />
                                        ) : (
                                            `${actualReps?.[setIndex] ? actualReps?.[setIndex] : '---'} / ${plannedRep}`
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {!isCoach ? (
                                            <Controller
                                                name={`log_exercises.${exerciseIndex}.actualWeight.${setIndex}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <span className="flex flex-row gap-2 justify-center">
                                                        <Input
                                                            type="number"
                                                            placeholder={String(weight[setIndex])}
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                            className="text-center w-24 h-7"
                                                        />
                                                        / {weight[setIndex]}
                                                    </span>
                                                )}
                                            />
                                        ) : (
                                            `${actualWeight?.[setIndex] ? actualWeight?.[setIndex] : '---'} / ${weight[setIndex]}`
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {!isCoach ? (
                                            <Controller
                                                name={`log_exercises.${exerciseIndex}.actualBreakTime.${setIndex}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <span className="flex flex-row gap-2 justify-center">
                                                        <Input
                                                            type="number"
                                                            placeholder={formatSecondsToMinutesAndSeconds(breakTime)}
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                            className="text-center w-24 h-7"
                                                        />
                                                    </span>
                                                )}
                                            />
                                        ) : (
                                            actualBreakTime && actualBreakTime.length > 0 ? formatSecondsToMinutesAndSeconds(actualBreakTime[setIndex]) : "---"
                                        )}
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