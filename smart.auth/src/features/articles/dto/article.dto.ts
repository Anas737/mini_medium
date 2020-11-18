import { DTO } from 'src/features/dto';

export interface ArticleDTO extends DTO {
    id: number;
    name: string;
    reference: string;
    content: string;
    draft: boolean;

    user: string;
    tags: string[];
    reactions: string[];
    comments: string[];

    createdAt: Date;
    updatedAt: Date;
}
