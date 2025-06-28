import {type ExerciseFormValues, exerciseSchema} from "@/lib/schemas/ExerciseSchema";
import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../ui/textarea';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {sampleCategories} from "@/lib/example_data";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Exercise } from "@/lib/types";
import {X} from "lucide-react";

type ExerciseFormProps = {
    exercise?: Exercise;
    onSubmit: (data: ExerciseFormValues) => void;
};

const ExerciseForm = ({exercise, onSubmit} : ExerciseFormProps) => {
    const form = useForm<ExerciseFormValues>({
        resolver: zodResolver(exerciseSchema),
        defaultValues: {
            name: exercise?.name || "",
            description: exercise?.description || "",
            categories: exercise?.categories || [],
            picture: null,
        },
        mode: 'onBlur',
    });

    const pictureFromForm = form.watch("picture");
    const [displayImageUrl, setDisplayImageUrl] = useState<string | undefined>(undefined);

    const currentCategories = form.watch("categories");

    useEffect(() => {
        if (pictureFromForm instanceof File) {
            const url = URL.createObjectURL(pictureFromForm);
            setDisplayImageUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else if (exercise?.picture) {
            setDisplayImageUrl(exercise.picture);
        } else {
            setDisplayImageUrl(undefined);
        }
    }, [pictureFromForm, exercise?.picture]);

    const handleCategorySelect = (categoryId: string) => {
        const selectedCategory = sampleCategories.find(cat => cat.id === categoryId);
        if (selectedCategory && !currentCategories.some(cat => cat.id === selectedCategory.id)) {
            form.setValue("categories", [...currentCategories, selectedCategory], { shouldValidate: true });
        }
    };

    const handleRemoveCategory = (categoryId: string) => {
        const updatedCategories = currentCategories.filter(cat => cat.id !== categoryId);
        form.setValue("categories", updatedCategories, { shouldValidate: true });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center ">
                <img
                    src={displayImageUrl ? displayImageUrl : "https://placehold.co/400x300"}
                    alt="Zdjęcie ćwiczenia"
                    className="max-w-full h-auto rounded-md"
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
            </div>
            <FormField
                control={form.control}
                name="picture"
                render={({ field: { onChange, value, ...fieldProps } }) => (
                    <FormItem>
                        <FormLabel>Zdjęcie/GIF (opcjonalnie)</FormLabel>
                        <FormControl>
                            <Input
                                name={fieldProps.name}
                                onBlur={fieldProps.onBlur}
                                className="cursor-pointer"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                ref={fieldProps.ref}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    form.setValue("picture", file, { shouldValidate: true });
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nazwa Ćwiczenia</FormLabel>
                            <FormControl>
                                <Input placeholder="np. Pompki" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Opis (opcjonalnie)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Szczegółowy opis ćwiczenia"
                                    {...field}
                                    className="w-full h-[200px] resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                        <FormItem>
                            <FormLabel>Kategorie</FormLabel>
                            <div className="flex flex-col gap-2">
                                <Select
                                    onValueChange={handleCategorySelect}
                                    value=""
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Wybierz kategorię do dodania" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sampleCategories
                                            .filter(cat => !currentCategories.some(selected => selected.id === cat.id))
                                            .map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>

                                {currentCategories.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {currentCategories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="flex items-center bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm gap-1"
                                            >
                                                <span>{category.name}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveCategory(category.id)}
                                                    className="h-6 w-6 rounded-full hover:bg-red-500 hover:text-white"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2">
                    <Button type="submit" className="cursor-pointer">
                        {exercise ? "Zapisz Zmiany" : "Dodaj Ćwiczenie"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ExerciseForm;