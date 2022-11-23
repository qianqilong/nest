import { IsNotEmpty, Length } from 'class-validator';

export default class createArticleDTO {
  @IsNotEmpty({ message: '标题不能为空！' })
  @Length(4, 10, { message: '标题不在4-10个字之间' })
  title: string;
  @IsNotEmpty({ message: '内容不能为空！' })
  content: string;
}
