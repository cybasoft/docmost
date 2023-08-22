import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'text', nullable: true })
  html: string;

  @Column({ type: 'jsonb', nullable: true })
  json: any;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  coverPhoto: string;

  @Column({ length: 255, nullable: true })
  editor: string;

  @Column({ length: 255, nullable: true })
  shareId: string;

  @Column({ type: 'uuid', nullable: true })
  parentPageId: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  workspaceId: string;

  @ManyToOne(() => Workspace, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @Column({ type: 'boolean', default: false })
  isLocked: boolean;

  @Column({ length: 255, nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  publishedAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Page, (page) => page.childPages)
  @JoinColumn({ name: 'parentPageId' })
  parentPage: Page;

  @OneToMany(() => Page, (page) => page.parentPage, { onDelete: 'CASCADE' })
  childPages: Page[];
}
