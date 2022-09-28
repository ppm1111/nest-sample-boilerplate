import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('increment')
    public id: number;
    
    @Column()
    public name: string;
    
    @Column()
    public lastName: string;

    @Column()
    public firstName: string;

    @Column()
    public isActive: boolean;
}
