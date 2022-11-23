## 项目创建
1. 安装```yarn add -g @nestjs/cli nodemon ts-node ``` 
2. 创建

```
nest new test 创建一个项目
nest 提示文件类型
nest g [文件类型][文件名] [文件目录（src目录下）] --no-spec
```
3. 数据库交互插件```Prisma```操作数据库
4. 管理文件插件```Dyno File Utils ```减少使用鼠标
5. 代码规范```.prettierrc```
```
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 120,
  "proseWrap": "never",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "singleAttributePerLine": false
}
```
6. nestjs的生命周期
```js
nest.js请求生命周期大致如下：

收到请求
全局绑定的中间件
模块绑定的中间件
全局守卫
控制层守卫
路由守卫
全局拦截器（控制器之前）
控制器层拦截器 （控制器之前）
路由拦截器 （控制器之前）
全局管道
控制器管道
路由管道
路由参数管道
控制器（方法处理器） 15。服务（如果有）
路由拦截器（请求之后）
控制器拦截器 （请求之后）
全局拦截器 （请求之后）
异常过滤器 （路由，之后是控制器，之后是全局）
服务器响应
```
7. nest 创建生成的文件
```js
      │application    │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ service       │ s           │ Generate a service declaration               │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      │ resource      │ res         │ Generate a new CRUD resource   
```
### 1.模块，控制器，路由，服务概念
```js
等价于(饭店:老板，厨师，采购，服务员),(KTV:......)
客户——>服务员/路由——>控制器(点菜，拿水)————>厨师炒菜/服务(炒土豆)——>采购/服务(买菜)——>老板(报销)
直接调用是客户直接跟服务(服务员，厨师)交流
1. 服务调用服务
客户跟服务(服务员)交流(上菜)，服务(服务员)跟服务(厨师)处理(炒菜)(服务中依赖注入)
2. 控制器调用服务
客户跟控制器(老板)交流,控制器调用服务(服务员)和服务(厨师)处理(控制器中依赖注入)                    
```
### 2.模块装饰器@Module详解
```js
@Module({
  // 装饰器
  imports: [],// 导入其他模块提供的服务
  controllers: [AppController],//控制器
  providers: [AppService],// 服务提供者
})
============>
function a() {}
a.prototype._module={
{
  imports: [],
  controllers: [AppController],
  providers: [AppService],
}
}
```
### 3.控制器
```js
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //父级路由
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('a') // 子级路由
  getHello(): string {
    // return 'hello';
    return this.appService.getHello();
  }
}
```
### 4.依赖注入
```js
class A{
    // 类A依赖于B,C
    // constructor(private B=new B(new C)) ==>反射解耦
    constructor(private bService:B){} // 相当于声明的一个B类型的数据
}
class B{
    constructor(private CService:C)
}
class C{
    constructor()
}
```
## 服务提供者
### 1.服务提供者修改注入名(可以在控制中和服务中依赖注入)
1. 模块中修改注入名
```js
const HD = {
  provide: 'HD', //依赖注入填写的名字
  useClass: HdService,
};
@Module({
  ...
  providers: [HD], // 提供服务
})
export class AppModule {}
```
2. 控制器中要进行依赖注入
```js
@Controller() 
export class AppController {
  constructor(
    @Inject('HD') //依赖注入
    private readonly hdService: HdService,
  ) {}
  ...
}
```
### 2.静态服务提供者
1. 在模块中提供常数
```js
const US = {
  // 静态提供者
  provide: 'US',
  useValue: {
    name: 'nest',
  },
};

@Module({
  ...
  providers: [US], // 提供服务
})
export class AppModule {}
```
2. 在服务中直接依赖注入
```js
@Injectable() // 服务声明
export class AppService {
  constructor(@Inject('US') private US: any) {}
  getHello(): string {
    return 'Hello World!' + this.US.name;
  }
}

```
### 3.根据环境变量选择提供者
1. 建立配置文件.env
2. 安装```yarn add dotenv```
3. 读取配置文件

```js
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../.env') }); 
const HD = {
  provide: 'HD',
  useClass: process.env.NODE_ENV==='development' ? HdService : AppService,
};
```
4. 装饰器提供服务
```js
@Module({
  ...
  providers: [HD], // 提供服务
})
```
5. 控制器中不加类型限制
```js
 constructor(
    @Inject('HD')
    private readonly hdService,
  ) {}
```
### 4.更据服务加载不同的配置项
1. 建立开发项
```js
src/config/development.config.ts // 开发配置项
src/config/production.config.ts // 上线配置项
```
2. 设置配置项方法```src/config.service.ts```
```js
config({ path: join(__dirname, '../.env') });
export const Configser = {
  provide: 'Configser',
  useValue:
    process.env.NODE_ENV === 'development'
      ? developmentConfig
      : productionConfig,
};
```
3. 装饰器提供服务
```js
@Module({
  ...
  providers: [Configser], // 提供服务
})
```
4. 服务中直接调用(控制器是间接调用服务)
```js
@Injectable() // 服务声明
export class AppService {
  constructor(
    ...
    @Inject('Configser') private configser: Record<string, any>,
  ) {}
  getHello(): string {
    return  this.configser.url;
  }
}
```
### 5.使用工厂函数注册提供者(模块中服务依赖于另一个服务)
1. 工厂函数间接调用
```js
@Module({
  // 装饰器
  ...
  providers: [
    ...
    Configser,
    {
      provide: 'DbService',
      // DbService依赖于configser
      inject: ['Configser'],
      useFactory(configser) {
        console.log(configser);
        return new DbService(configser); //传递主服务的依赖注入选项
      },
    },
  ], // 提供服务
})
export class AppModule {}
```
2. 依赖注入
```js
@Injectable()
export class DbService {
  // 依赖注入其他的参数
  constructor(private options: Record<string, any>) {}
  public connect() {
    return '<h1>连接数据库</h1>' + '开发环境' + this.options.url;
  }
}
```
### 6.模块服务共享问题
1. Hd模块共享Hd服务
```js
// 把hd模块的服务共享出去
@Module({
  providers: [HdService],
  exports: [HdService], // 开放这个服务
})
export class HdModule {}
```
2. dev引入hd模块
```js
@Module({
  imports: [HdModule], // 使用其他模块
  providers: [DevService],
  controllers: [DevController],
})
export class DevModule {}
------dev控制器------
@Controller('dev')
export class DevController {
  constructor(
    private readonly devservice: DevService,
    private readonly hdservice: HdService, // 依赖注入hd的服务
  ) {}

...
}

```
### 7.注册异步服务提供者
```js
@Module({
  // 装饰器
  ...
  providers: [
    ...
    Configser,
    {
      provide: 'DbService',
      // DbService依赖于configser
      inject: ['Configser'],
      useFactory:async(configser)=>{
        return new Promise((r)=>{
          setTimeout(() => {
            r('abc')
          }, 3000);
        }) //传递主服务的依赖注入选项
      },
    },
  ], // 提供服务
})
export class AppModule {}
```
## 模块
### 1.读取全部配置项模块
1. 建立配置文件模块和配置文件
```js
src/config/config.module.ts
src/config/config.service.ts
src/configure/app.config.ts
src/configure/database.ts
```
2. 配置文件服务
```js
@Injectable()
export class ConfigService {
  config = {} as any;
  constructor() {
    const config = { path: join(__dirname, '../configure') };
    readdirSync(config.path).map(async (file) => {
      if (file.slice(-2) === 'js') {
        const module = await import(join(config.path, file));
        this.config = { ...this.config, ...module.default() };
        console.log(this.config);
      }
    });
  }
  get() {
    // return this.config.app.name + this.config.database.host; // 静态读取配置项
    return path.split('.').reduce((pre, item) => { // 动态读取配置项
      return pre[item];
    }, this.config);
  }
}
```
3. 配置文件模块
```js
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```
4. 控制器调用服务
```js
@Controller() //父级路由
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configservice: ConfigService,
  ) {}

  @Get() // 子级路由
  getHello(): string {
    return  this.configservice.get('app.name');// 动态调用
    // return  this.configservice.get(); // 静态调用
  }
}
```
### 2.模块之间的调用(全局注册模块和单独引入模块)
1. 创建文件
```js
src/config/confing.module.ts
nest g mo article --no-spec
nest g co article --on-spec
```
2. 全局注册外部模块
```js
@Global() // 全局注册了模块，其他模引入时无需导入
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```
3. 内部模块无需引入
```js
@Module({
  // imports: [ConfigModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
```
4. 内部控制器中直接调用导出的方法
```js
@Controller('article')
export class ArticleController {
  constructor(private readonly configservice: ConfigService) {}
  @Get()
  index() {
    return this.configservice.get('app.name');
  }
}
```
### 3.动态模块的读取(文件夹名不定)
```
内部模块想给内部服务传递一个参数，
（1）内部模块中添加静态函数接收参数返回动态服务，
（2）主模块中注册当前模块时调用静态函数传递参数
（3）内部服务依赖注入内部模块返回的动态服务得到参数
```
1. 创建文件
```
src/config/config.module.ts
src/config/config.service.ts
```
2. 配置文件模块添加静态函数接收参数返回动态服务
```js
@Global() // 全局注册了模块，其他模引入时无需导入
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  static register(options: { path: string }): DynamicModule {
    // 添加动态模块
    return {
      module: ConfigModule,
      providers: [{ provide: 'options', useValue: options }],
      exports: ['options'],
    };
  }
}
```
3. 配置文件服务中依赖注入动态服务
```js
@Injectable()
export class ConfigService {
  // @Optional()不执行依赖注入
  constructor(
    @Inject('options') private options: any,
    @Optional() private config = {},
  ) {
    readdirSync(options.path).map(async (file) => {
      if (file.slice(-2) === 'js') {
        const module = await import(join(options.path, file));
        this.config = { ...this.config, ...module.default() };
      }
    });
  }
  get(path: string) {
    return path.split('.').reduce((pre, item) => {
      return pre[item];
    }, this.config);
  }
}
```
4. 引入配置模块时调用静态函数填写文件路径参数

```js
@Module({
  // 装饰器
  imports: [
    DevModule,
    HdModule,
    ConfigModule.register({ path: join(__dirname, './configure') }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService], // 提供服务
})
export class AppModule {}

```
## 数据库Prisma
### 1.创建Prisma项目操作数据库
1. 安装依赖项
```js
使用mockjs (opens new window)生成随机数据
使用 argon2 (opens new window)加密密码
yarn add prisma-binding @prisma/client mockjs argon2
yarn add -D prisma typescript @types/node @types/mockjs
```
2. 创建prisma配置文件```npx prisma init```
```
生成.env,prisma/schema.prisma
.env中可以修改数据库连接的信息DATABASE_URL="mysql://root:123456@localhost:3306/nest-blog"
```
3. 修改schema.prisma文件
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql" //数据库类型
  url      = env("DATABASE_URL")
}

model user{
  // 名 整数 主键 默认值(自增) 非负的
  id BigInt @id @default(autoincrement()) @db.UnsignedBigInt
  email String
  password String 
  avatar String ? // ？可选的
  github String ?
  douyin String ?
  weibo String ?
}
```
4. 提交生成表
```
执行 npx prisma migrate dev 
输入 提交表的介绍
之后会生成创建数据库表的日志文件
当schema.prisma文件更新时
继续执行 npx prisma migrate dev 

执行日志文件npx prisma migrate reset

```
5. 详细的schema.prisma文件
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql" //数据库类型
  url      = env("DATABASE_URL")
}

model user{ // 用户信息
  // 名 整数 主键 默认值(自增) 非负的
  id BigInt @id @default(autoincrement()) @db.UnsignedBigInt
  email String
  password String 
  avatar String ?
  github String ?
  douyin String ?
  weibo String ?
  waketime String ?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt // 自动维护
}

model category{ // 分类
  id BigInt @id @default(autoincrement()) @db.UnsignedBigInt
  title String // 标题
  articles article[]
}

model article{ // 文章
   id BigInt @id @default(autoincrement()) @db.UnsignedBigInt
   title String // 文章名
   content String @db.Text // 内容
   thumb String 
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt // 自动维护
   //类型category	关联定义(本表字段catgoryId,关联category表id,主表记录删除时同时删除关联表数据）
   category category? @relation(fields: [categoryId],references:[id],onDelete:Cascade )
   categoryId BigInt @db.UnsignedBigInt
}
```
注：写多表关联时无法自动校正文件命令```npx prisma format```
### 2.Prisma简单数据填充
1. 配置package.json添加```npx prisma db seed ```命令
```js
{
  ...
  "prisma":{
    "seed":"ts-node prisma/seed.ts"
  },
  "scripts": {
   ...
  },
  ...
}
```
2. 在prisma文件下建立seed.ts文件
```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function run() {
  await prisma.user.create({
    data: {
      email: '1959377950@qq.com',
      password: '123456',
    },
  });
}

run();
```
3. 执行数据填充命令```npx prisma db seed```
### 3.Prisma mock数据填充
1. 修改seed.ts
```ts
import { PrismaClient } from '@prisma/client';
+ import { Random } from 'mockjs';

const prisma = new PrismaClient();

async function run() {
+  for (let i = 0; i < 20; i++) {
  await prisma.user.create({
    data: {
+      email: Random.email(),
+      password: '123456',
+      github: Random.email(),
+      avatar: Random.image('300x300'),
    },
  });
+   }
}

run();

```
2. 重新建表并填充数据``` npx prisma migrate reset```
### 4.数据填充的拆分(分表填充)
1. 循环函数helper.ts(阻塞等待)
```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 *
 * @param count 模拟数据条数
 * @param callback 回调函数(操作数据库的实例)
 */
export async function create(
  count = 1,
  callback: (prisma: PrismaClient) => void,
) {
  for (let i = 0; i < count; i++) {
  await  callback(prisma);
  }
}
```
2. 拆分函数user()(阻塞等待)
```js
prisma/sends/user.ts
import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import { create } from '../helper';

export function user() {
 await create(30, async (prisma: PrismaClient) => {
    await prisma.user.create({
      data: {
        email: Random.email(),
        password: '123456',
        github: Random.email(),
        avatar: Random.image('钱'),
      },
    });
  });
}

```
3. 重新建表并填充数据``` npx prisma migrate reset```(阻塞等待)
```ts
import { article } from './seeds/article'
import { category } from './seeds/category'
import { user } from './seeds/user'

async function run() {
 await user()
 await category()
 await article()
}
run()

```
### 5.关联表数据填充主键问题
(文章依赖于分类,分类还没有，文章就已经出现，无关系依赖)
1. 阻塞等待
```js
async function a(){
  await new Promise((r)=>{
    setTimeout(()=>{
      console.log('a')
      r('ok')
    },3000)
  })
}

async function b(){
  await a()
  console.log('b')
}

输出a,b
```
2. 对每个创建的分类进行阻塞等待
```js
// 对创建分类进行阻塞
export async function category() { 
  await create(10, async (prisma: PrismaClient) => {
    await prisma.category.create({
      data: {
        title: Random.ctitle(),
      },
    });
  });
}
```
3. 对填充的循环函数进行阻塞等待
```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * @param count 模拟数据条数
 * @param callback 回调函数(操作数据库的实例)
 */
export async function create(count = 1, callback: (prisma: PrismaClient) => void) {
  for (let i = 0; i < count; i++) {
  await  callback(prisma);
  }
}
```
### 6.prisma常用的数据操作
#### (1)创建数据
1. 填充数据
```js
await prisma.user.create({
      data: {
        // 数据
      },
    });
```
2. 填充多条数据
```js
await prisma.user.createMany({
  data: [
    { name: 'Bob', email: 'bob@prisma.io' },
    { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
    { name: 'Yewande', email: 'yewande@prisma.io' },
    { name: 'Angelique', email: 'angelique@prisma.io' },
  ],
  skipDuplicates: true, // Skip 'Bobo'
})
```
#### (2)查询数据
1. 单一主键查询或不重复项查询
```js
const user = await prisma.user.findUnique({
  where: {
    email: 'elsa@prisma.io',
  },
})
```
2. 联合主键查询
```js
/*model TimePeriod {
  year    Int
  quarter Int
  total   Decimal

  @@id([year, quarter])
}*/


const timePeriod = await prisma.timePeriod.findUnique({
  where: {
    year_quarter: {
      quarter: 4,
      year: 2020,
    },
  },
})
```
3. 多条数据查询
```js
const users = await prisma.user.findMany()
```
4. 多条数据分页查询
```js
 const artList = await this.prisma.article.findMany({
      where: {
        channelsId: id,
      },
      skip: (page - 1) * limit, // 开始数据位置
      take: limit, // 数据条数
    })
```
5. 多表关联查询
```js
 const artDetail = await this.prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
```
6. 关联表的关联表查询
```js
const user = await prisma.user.findMany({
  include: {
    table: {
      include: {
        onetable: true,
      },
    },
  },
})
```
7. 普通查询(非主键和唯一性数据)
```js
  const flag = await prisma.user.findFirst({
            where: {
              name: value,
            },
          });
```
#### (3)更新数据
1. 普通更新
```js
const updateUser = await prisma.user.update({
  where: {
    email: 'viola@prisma.io',
  },
  data: {
    name: 'Viola the Magnificent',
  },
})
```
2. 多条数据更新
```js
const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  data: {
    role: 'ADMIN',
  },
})
```
#### (4)删除数据
1. 普通数据删除
```js
const deleteUser = await prisma.user.delete({
  where: {
    email: 'bert@prisma.io',
  },
})
```
2. 多条数据删除
```js
const deleteUsers = await prisma.user.deleteMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
})
```
#### (5)原生sql
1. sql查询
```js
  keywords = `%${keywords}%`
    return this.prisma.$queryRaw`select * from article where content like ${keywords}`s
```
## 配置管理
### 1.单一文件配置管理
1. 安装```yarn add @nestjs/config```
2. 填写配置文件.env
3. 设置配置文件app.config.ts

```js
export default () => ({
  app: {
    name: 'qql',
    isDev: process.env.NODE_ENV === 'development',
  },
})
```
4. 模块中引入配置模块并加载配置文件
```js
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
      load: [appConfig], //加载配置文件到.env
    }),
  ],
  controllers: [AppController],
  providers: [AppService], // 提供服务
})
export class AppModule {}

```
5. 控制器中读取配置项
```js
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
// 引入 ConfigService,并依赖注入
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly config: ConfigService) {}

  @Get() // 子级路由
  getHello(): any {
    // return this.appService.getHello()
    // return process.env.APP_Name (node直接读取配置文件)
    console.log(this.config.get('app.isDev'))
    return this.config.get('APP_NAME')
  }
}

```
### 2.基于命名空间多文件配置管理(增加提示)
1. 修改配置文件app.config为例子
```js
import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  name: 'qql',
  isDev: process.env.NODE_ENV === 'development',
}))
/**
 * 这样写相当于在内置confModule中的服务提供者进行提供命名
 * providers: [{
 * provide:'xxx.key',
 * useValue:{
 * xxxx:xxxxx
 * }
 * }], // 提供服务
 */

```
2. 建立config文件夹并设置设置index
```js
import appConfig from './app.config'
import uploadConfig from './upload.config'

export default [appConfig, uploadConfig]
```
3. 模块中加载配置文件
```js
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
      load: config, //加载配置文件到.env
    }),
  ],
  controllers: [AppController],
  providers: [AppService], // 提供服务
})
export class AppModule {}

```
4. 加入类型限制并且依赖注入
```js
 /* type getType<T extends () => any> = T extends () => infer U ? U : T
    type appConfigType = getType<typeof appConfig> 类型提示工具*/,

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
    @Inject(appConfig.KEY)
    private app: ConfigType<typeof appConfig>
  ) {}

  @Get() // 子级路由
  getHello(): any {
    return this.app.name
  }
}

```
## 管道(pipe),验证(DTO)和过滤器(filter)
### 1.简单的数据库查询问题引出管道
1. 数据查询
```js
@Controller()
export class AppController {
  prisma: PrismaClient; // 添加查询
  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient();
  }

  @Get(':id') // 添加params参数
  getHello(@Param('id') id: number): any {
    return this.prisma.article.findUnique({
      // 查询文章id对应的文章
      where: {
        // id, // 要求时int类型而传过来的id是string类型
        id: Number(id), // 直接镜像类型转换会很麻烦
      },
    });

  }
}


```
2. 创建管道,管道实现数值转换```nest g pi hd --no-spec ```
```js
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //{ metatype: [Function: Number], type: 'param', data: 'id' } 
    // metatype后面的数据类型时走管道后需要的数据类型
    return metadata.metatype === Number ? +value : value; //处理数据
  }
}
```
3. 数据查询引入管道
```js
@Controller()
export class AppController {
 ...

  @Get(':id') // 添加params参数
  getHello(@Param('id', HdPipe) id: number): any {
    // 先走管道然后在赋值给后面的id
   ...
  }
}

```
4. 默认值管道
```js
@Controller()
export class AppController {
 ...
  @Get(':id') // 添加params参数
  @UsePipes(HdPipe)
  getHello(@Param('id', new DefaultValuePipe(1)) id: number): any {
   ...
  }
}
```
5. nest中自带了一些管道
```js
import {
ValidationPipe,// 验证参数有效性
ParseIntPipe,// 转换为整形
ParseBoolPipe, //转换为布尔形
ParseArrayPipe, //转换为数组
ParseUUIDPipe, // 转换为UUID
DefaultValuePipe //默认值管道
} from '@nestjs/common';
```
#### 管道其他定义(全局管道，局部管道)
1. 控制器的单个方法上
```js
@Controller()
export class AppController {
  ...
  @Get(':id') // 添加params参数
 + @UsePipes(HdPipe)
  getHello(@Param('id') id: number): any {
   ...
  }
}
```
2. 控制器上
```js
// 对所有参数校检
@Controller()
@UsePipes(HdPipe)
export class AppController {
  ...
}
```
3. 模块的服务提供者中
```js
// 模块中放入管道
@Module({
  controllers: [AppController],
  providers: [AppService,
  {
    provide:APP_NAME,
    useClass:HdPipe
  }
  ], // 提供服务
})
export class AppModule {}
```
4. 入口文件中(全局管道)
```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道
  app.useGlobalPipes(new HdPipe());
  await app.listen(3000);
}
bootstrap();

```
### 2.使用管道,DTO实现数据的简单自定义验证
1. 安装依赖
```js
yarn add class-validator class-transformer
yarn add -D @nestjs/mapped-types
```
2. 建立文章类的DTO文件
```js
export default class createArticleDTO {
  title: string;
  content: string;
}
```
3. 控制器中的输入的值进行类型限制(方便管道中读取到文章类而实例化)
```js
@Controller()
export class AppController {
  ...
  // 添加文章
  @Post('add')
  add(@Body(ArticlePipe) dto: createArticleDTO) { //对文章类型限制为文章类
    return dto;
  }
}
```
4. 管道中通过class-transformer实例化文章类
```js
@Injectable()
export class ArticlePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value); // 实例化createArticleDTO的对象
    return value;
  }
}
```
5. 文章类中通过class-validator添加信息的校检信息
```js
export default class createArticleDTO {
 + @IsNotEmpty({ message: '标题不能为空！' })
 + @Length(4, 10, { message: '标题不在4-10个字之间' })
  title: string;
 + @IsNotEmpty({ message: '内容不能为空！' })
  content: string;
}
```
6. 遍历错误信息
```js

@Injectable()
export class ArticlePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToInstance(metadata.metatype, value); // 实例化createArticleDTO的对象
 +   const err = await validate(obj); // 通过DTO和validate实现信息返回一个promise对象，中间包含没有通过校检的信息以数组的形式呈现
 +   if (err.length) {
 +     // 数组长度大于0时遍历错误信息抛出,Object.values读取对象里面的value值
 +     const messages = err.map((error) => ({
 +       name: error.property,
 +       messages: Object.values(error.constraints),
 +     }));
 +     throw new HttpException(messages, HttpStatus.BAD_REQUEST);
 +   }
    return value; // 通过认证
  }
}
```
7. 控制器中完成对文章数据添加入数据库
```js
@Controller()
export class AppController {
  ...
  // 添加文章
  @Post('add')
  add(@Body(ArticlePipe) dto: createArticleDTO) { //对文章类型限制为文章类
    const article = this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
    return article;
  }
}
```
### 3.使用系统管道，DTO实现验证
#### (1)使用系统管道
1. 在入口文件中引入ValidationPipe
```js
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```
2. 建立文章类的DTO文件通过class-validator添加信息的校检信息
```js
export default class createArticleDTO {
 + @IsNotEmpty({ message: '标题不能为空！' })
 + @Length(4, 10, { message: '标题不在4-10个字之间' })
  title: string;
 + @IsNotEmpty({ message: '内容不能为空！' })
  content: string;
}
```
3. 控制器中加类型限制
```js
@Controller()
export class AppController {
  ...
  // 添加文章
  @Post('add')
  add(@Body(ArticlePipe) dto: createArticleDTO) { //对文章类型限制为文章类
    return dto;
  }
}
```
#### (2)继承重写系统管道(加入错误标题)
1. 创建一个类继承ValidationPipe

```js
import { ValidationError, ValidationPipe } from '@nestjs/common';

// 继承系统的管道方法
export class validate extends ValidationPipe {
  protected mapChildrenToValidationErrors(
    error: ValidationError,
    parentPath?: string,
  ): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath);
    errors.map((error) => {
      for (const key in error.constraints) {
        error.constraints[key] = error.property + ':' + error.constraints[key];
      }
    });
    return errors;
  }
}

```
2. 入口文件中引入继承的类使用
```js
import { validate } from './pipe/Validate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道
  app.useGlobalPipes(new validate());
  await app.listen(3000);
}
bootstrap();

```
### 4.使用过滤器(filter)进行异常处理
(管道之后执行服务(其中包含的错误信息),捕获异常信息)
1. 创建文章过滤器```nest g f article filter --no-spec```
2. 使用全局过滤器
```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局过滤器
  app.useGlobalFilters(new ArticleFilter());
  await app.listen(3000);
}
bootstrap();
```
3. 多过滤的异常信息处理(没有过滤器管道会直接返回异常信息,异常信息没有对应k-v无法好的识别)
```js
@Catch()
export class ArticleFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取http的上下文
    const response = ctx.getResponse(); // 获取上下文的响应对象并返回
    if (exception instanceof BadRequestException) {
      // 判断异常类型 对异常的信息进行处理
      const responseObject = exception.getResponse() as any;
      console.log(responseObject);
      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: responseObject.message.map((error) => {
          const info = error.split(':');
          return { field: info[0], message: info[1] };
        }), // 把异常的信息改为对象数组
      });
    }
    return response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
          });
  }
}
```
4. 局部过滤器的使用(控制器前定义)
```js
@Controller()
export class AppController {
  ...
  // 添加文章
  @Post('add')
  // 局部过滤器
  @UseFilters(new ArticleFilter())
  async add(@Body() dto: createArticleDTO) {
  ...
  }
}

```
### 5.自定义DTO的校检规则
1. 建立用户DTO类
```js
export default class UserinfoDTO {
  @IsNotEmpty({ message: '用户名不能为空！' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空！' })
  password: string;
}

```
2. 建立用户模块，用户控制器(使用dto类)
```js
@Controller('user')
export class UserController {
  @Post('register')
  async register(@Body() dto: UserinfoDTO) {
    const prisma = new PrismaClient();
    const uesr = await prisma.user.create({
      data: {
        username: dto.username,
        password: dto.password,
      },
    });
    return uesr;
  }
}

```
3. 前面定义了全局管道和全局过滤器因此我们只需要自定义DTO验证规则
4. 类验证规则(实现再次输入密码相同)
```js
@ValidatorConstraint()
export class IsConfirmed implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    return value === args.object[args.property + '_confirmed'];
  }

  defaultMessage() {
    // 默认消息
    return '数据不匹配';
  }
}
```
5. 装饰器验证规则(查找数据库是否重复,例：用户名是否存在)
```js
//表字段是否唯一
export function IsNoExists(
  table: string, // 数据库中的那一张表
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsConfirmedRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();
          //   查询表中是否有该数据
          const flag = await prisma[table].findFirst({
            where: {
              [args.property]: value,
            },
          });
          return !Boolean(flag);
        },
      },
    });
  };
}

```
6. 用户DTO类中使用自定义校检
```js
export default class UserinfoDTO {
  @IsNotEmpty({ message: '用户名不能为空！' })
+ @IsNoExists('user', { message: '用户已经存在！' }) //查表 使用装饰器校检规则
  username: string;
  @IsNotEmpty({ message: '密码不能为空！' })
+ @Validate(IsConfirmed, { message: '确认密码输入错误！' }) // 使用类校检规则
  password: string;
}

```
## 简单登录和注册的实现（无jwt和token)
### 1.项目初始化
1. 创建新项目```nest new test```
2. 安装数据库依赖
```js
yarn add prisma-binding @prisma/client mockjs argon2
yarn add -D prisma typescript @types/node @types/mockjs
```
3. 安装验证的依赖
```js
yarn add class-validator class-transformer
yarn add -D @nestjs/mapped-types
```
4. 执行命令初始化库```npx prisma init```
5. 修改数据库配置文件.env
```js
DATABASE_URL="mysql://root:123456@localhost:3306/nest-blog"
```
6. 添加创建数据库的模型
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model user{
  id Int @id @default(autoincrement()) @db.UnsignedInt
  name String
  password String
}
```
7. 生成数据库中的表```npx prisma migrate dev```
### 2.注册逻辑的实现
#### (1)生成prisma的服务和模块
```nest g mo prisma --no-spec nest g s prisma --no-spec```
1. 服务继承PrismaClient

```js
@Injectable()
export class PrismaService extends PrismaClient {}
```
2. 模块全局注册，并暴露方法
```js
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```
#### (2)生成模块,服务,控制器
```nest g res user  --no-spec```
1. 设置DTO,管道和过滤器(继承系统管道，并全局注册),以及校检规则
```js
DTO
export default class registerDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('user', { message: '用户名已存在,请更换用户名' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirmedRule({ message: '确认密码与密码不同' })
  password: string;
}
管道
export class validatePipe extends ValidationPipe {
  protected mapChildrenToValidationErrors(
    error: ValidationError,
    parentPath?: string,
  ): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath);
    errors.map((error) => {
      for (const key in error.constraints) {
        error.constraints[key] = error.property + ':' + error.constraints[key];
      }
    });
    return errors;
  }
}
过滤器
@Catch()
export class GlobalFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof BadRequestException) {
      const responseObj = exception.getResponse() as any;
      return response.status(400).json({
        code: 400,
        message: responseObj.message.map((error) => {
          const info = error.split(':');
          return { field: info[0], message: info[1] };
        }),
      });
    }
    return response;
  }
}
密码确认校检
export function IsConfirmedRule(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsConfirmedRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          return value === args.object[args.property + '_confirmed'];
        },
      },
    });
  };
}
查表不存在校检
export function IsNoExistsRule(
  table: string, // 数据库中的那一张表
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNoExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();
          //   查询表中是否有该数据
          const flag = await prisma[table].findFirst({
            where: {
              [args.property]: value,
            },
          });
          return !Boolean(flag);
        },
      },
    });
  };
}

```
2. 创建注册的服务```依赖注入prisma```
```js
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register(dto: registerDTO) {
    const password = await hash(dto.password); // 加密
    const user = this.prisma.user.create({
      data: {
        username: dto.username,
        password,
      },
    });
    return user;
  }
}

```
3. 控制器调用服务
```js
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  register(@Body() dto: registerDTO) {
    return this.userService.register(dto);
  }
}

```
### 3.登录逻辑的实现
1. 修改校检规则(同时处理登录注册用户存在与否问题)
```js
export function IsNoExistsRule(
  state: string, // 注册还是登录
  table: string, // 数据库中的那一张表
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNoExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();
          //   查询表中是否有该数据
          const flag = await prisma[table].findFirst({
            where: {
              [args.property]: value,
            },
          });
          if (state === 'register') return !Boolean(flag);
          else return Boolean(flag);
        },
      },
    });
  };
}

```
2. 创建DTO
```js
export default class loginDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('login', 'user', { message: '该用户不存在' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
```
3. 添加登录服务
```js
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  // 注册的服务
  async register(dto: registerDTO) {
    const password = await hash(dto.password); // 加密
    const user = this.prisma.user.create({
      data: {
        username: dto.username,
        password,
      },
    });
    return user;
  }
  // 登录的服务
  async login(dto: loginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    // 校检密码
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException(['password:密码输入错误']);  // 让过滤器知道信息来源
    }
    return user;
  }
}

```
4. 控制器调用服务
```js
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
   ...
  @Post('login')
  login(@Body() dto: loginDTO) {
    return this.userService.login(dto);
  }
}
```
## JWT认证
### 1.安装相关依赖和配置
1. 安装JWT依赖包
```js
yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt
yarn add -D @types/passport-local @types/passport-jwt
```
2. 在.env设置JWT秘钥```TOKEN_SECRET='qianqilong'```
3. 安装配置管理模块```yarn add @nestjs/config```
4. 主模块中引入配置管理全局注册
```js
@Module({
  imports: [
    ...
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```
### 2.实现登录的JWT认证
#### (1)书写token模块的服务
1. 创建token模块和服务```nest g mo token module --no-spec   nest g s token module --no-spec```
2. 模块中引入封装的jwt模块并设置秘钥和存在时间同时导出token设置的服务
```js
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'), // 读取jwt秘钥
          signOptions: { expiresIn: '10d' }, // 设置存在时间
        };
      },
    }),
  ], // 引入jwt模块
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}

```
3. 书写设置token的服务(导出)
```js
@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}
  //   生成token的服务
  async setToken({ username, id }: user) {
    return {
      token: await this.jwt.signAsync({
        name: username,
        sub: id,
      }),
    };
  }
}
```
#### (2)实现登录时tokn
1. 书写jwt策略(查找的最后值放在request中)
```js
import { PrismaService } from '../module/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      //解析用户提交的header中的Bearer Token数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //加密码的 secret
      secretOrKey: configService.get('TOKEN_SECRET'),
    });
  }

  //验证通过后获取用户资料
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
```
2. 用户模块引入jwt方法和设置token模块
```js
@Module({
  imports: [TokenModule], // 方便使用设置token的方法
  controllers: [UserController],
  providers: [UserService, JwtStrategy], // 导入了jwt策略
})
export class UserModule {}

```
3. 实现用户登录服务中返回token和测试token的有效性
```js
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private token: TokenService) {}
  // 注册的服务
  ...

  // 登录的服务
  async login(dto: loginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    // 校检密码
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException(['password:密码输入错误']);
    }
    return this.token.setToken(user);
  }

  // 测试token认证
  async test() {
    return this.prisma.user.findMany(); // 获取所有用户
  }
}

```
4. 模块中调用jwt认证策略实现token的认证
```js
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 注册
  ...
  // 登录
  @Post('login')
  login(@Body() dto: loginDTO) {
    return this.userService.login(dto);
  }
  // 测试token
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req: Request) { // express服务器的Request
    req.user;
    return this.userService.test();
  }
}

```
注意：上面的全局过滤器会捕获到401的错误，全局过滤器要进行适当的修改
#### (3)简化上面的操作
1. 装饰器的简化(聚合)
```js
export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
```
2. req的参数装饰器(读取策略中返回的用户信息)
```js
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```
3. 控器中使用聚合装饰器和参数装饰器
```js
@Controller('user')
export class UserController {
  ...
  // 测试token
  @Get('test')
  @Auth()
  test(@User() user: UserType) {
    console.log(user); // token对应的身份
    return this.userService.test();
  }
}
```
### 3.路由守卫实现权限访问(AuthGuard)
1. 创建守卫```nest g gu user --no-spec```
```js
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 反射中包含了SetMetadata('roles', roles)放入的全局中，其他守卫可以使用
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    return user?.id == 1;
  }
}

```
2. 聚合装饰器中调用jwt策略后加守卫
```js
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
}

```
注意：过滤器会捕获403,要在状态码上加403否则守卫不起作用
```js
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: Record<string, any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // console.log(exception.status);
    if (exception.status === 400) {
      const responseObj = exception.getResponse() as any;
      return response.status(400).json({
        code: 400,
        message: responseObj.message.map((error) => {
          const info = error.split(':');
          return { field: info[0], message: info[1] };
        }),
      });
    } else if (exception.status === 401) {
      return response.status(401).json({
        code: 401,
        message: '用户身份已过期，请重新登录',
      });
    } else if (exception.status === 403) {
      return response.status(401).json({
        code: 403,
        message: '权限不够，请重新登录',
      });
    } else {
      return response.status(404).json({
        code: 404,
      });
    }
    return response;
  }
}

```
## 文件上传
### 1.拦截器(前后都会调用)
1. 定义拦截器实现data对返回数据的包裹
```js
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('拦截器前');
    const request = context.switchToHttp().getRequest() as Request;
    const startTime = Date.now();
    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now();
        new Logger().log(
          `TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${
            request.method
          }`,
        );
        return {
          data,
        };
      }),
    );
  }
}

```
#### (1)拦截器的使用
1. 控制器上使用拦截器
```js
@UseInterceptors(new TransformInterceptor())
export class CatsController {}
```
2. 方法上使用拦截器
```js
@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // 前后都会执行
  image() {
    return 'abc';
  }
}

```
3. 模块中定义拦截器
```js
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
```
4. 全局注册拦截器
```js
const app = await NestFactory.create(ApplicationModule);
app.useGlobalInterceptors(new TransformInterceptor());
```
### 2.使用内部的拦截器实现对文件的上传的限制
#### (1)简单文件上传的实现
1.  安装依赖

```js
yarn add multer
yarn add -D @types/multer
```
2. 文件上传模块在使用工厂方法注册模块方法
```js
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            //文件储存位置
            destination: 'uploads',
            //文件名定制
            filename: (req, file, callback) => {
              const path =
                Date.now() +
                '-' +
                Math.round(Math.random() * 1e10) +
                extname(file.originalname);
              callback(null, path);
            },
          }),
        };
      },
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}

```
3. 文件上传控制器对文件上传类型和大小的限制
```js
@Controller('upload')
@UseInterceptors(new TransformInterceptor())
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: Math.pow(1024, 2) * 2 }, // 文件大小
      fileFilter(
        req: any,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        // 对文件上传类型限制
        if (!file.mimetype.includes('image'))
          callback(new MethodNotAllowedException('文件类型不允许'), false);
        else callback(null, true);
      },
    }),
  ) // 前后都会执行
  image(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}

```
#### (2)文件上传代码的优化
1. 对装饰器聚合以及其参数的封装
```js
export function fileFilter(type: string) {
  return (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // 对文件上传类型限制
    if (!file.mimetype.includes(type))
      callback(new MethodNotAllowedException('文件类型不允许'), false);
    else callback(null, true);
  };
}

export function Upload(filed = 'file', options: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(filed, options)));
}

```
2. 修改文件上传控制器装饰的代码
```js
@Controller('upload')
@UseInterceptors(new TransformInterceptor())
export class UploadController {
  @Post('image')
  @Upload('file', { // 对装饰器聚合
    limits: { fileSize: Math.pow(1024, 2) * 2 }, // 文件大小
    fileFilter: fileFilter('image'), // 封装验证文件类型方法
  })
  image(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
```
3. 对装饰器的进一步封装(图片上传装饰器)
```js
// 上传图片的封装
export function ImageUpload(filed = 'file') {
  return Upload(filed, {
    limits: { fileSize: Math.pow(1024, 2) * 2 }, // 文件大小
    fileFilter: fileFilter('image'),
  });
}

```
4. 使用图片上传装饰器
```js
@Controller('upload')
@UseInterceptors(new TransformInterceptor())
export class UploadController {
  @Post('image')
  @ImageUpload()
  image(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}

```
#### (3)静态服务
1. 文件上传静态资源```main.ts```

```js
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('uploads', { prefix: '/uploads' }); // 声明文件路径
  await app.listen(3000);
}
bootstrap();
```
2. 配置服务```部署前端项目vue/dist```

```js
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
	//传递类型NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  ...
  //批量定义访问目录，同步遍历 src目录
  readdirSync(join(process.cwd(), 'src')).forEach((dir) => {
    //判断是否为目录
    const isDir = statSync(join(process.cwd(), 'src', dir)).isDirectory()
    if (isDir) {
      //定义静态访问目录
      app.useStaticAssets(join(process.cwd(), 'src', dir, 'vue/dist'), {
        prefix: `/static/${dir}`,
      })
    }
  })
  await app.listen(3000)
}
bootstrap()
```
## 实现日志系统
1. 安装日志系统```yarn add log4js stacktrace-js moment -S  ```
### 1.日志文件
1. 实现日志文件的配置
```js
import { join } from 'path';
const baseLogPath = join(__dirname, '../../logs'); // 日志要写入哪个目录

const log4jsConfig = {
  appenders: {
    console: {
      type: 'console', // 会打印到控制台
    },
    access: {
      type: 'dateFile', // 会写入文件，并按照日期分类
      filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true, // 是否保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;

```
2. 实例日志工具函数
```js
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import * as Moment from 'moment'; // 处理时间的工具
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import config from '../config/log4js';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

Log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';

    // 日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });

    // 日志组成部分
    const messageOutput: string = messageList.join(' ');
    const positionOutput: string = position ? ` [${position}]` : '';
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput: string = moduleName
      ? `[${moduleName}] `
      : '[LoggerService] ';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }

    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(
      moduleOutput,
    )}${levelOutput}${positionOutput}`;
  };
});

// 注入配置
Log4js.configure(config);

// 实例化
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}

```
### 2.中间件记录请求的路由/IP/参数等信息
1. 创建中间件并进行配置```nest g middleware logger middleware```
```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Injectable()
export class ViewsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组件日志信息
    const logFormat = `Method:${req.method} \n Request original url:${req.originalUrl} \n IP:${req.ip} \n Status code: ${code} \n`;
    // 根据状态码进行日志区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = `Request original url:${req.originalUrl}
                     Method:${req.method}
                     IP:${req.ip}
                     Status code:${code}
                     Params:${JSON.stringify(req.params)}
                     Query:${JSON.stringify(req.query)}
                     Body:${JSON.stringify(req.body)} `;
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
```
2. 应用中间件
```js
async function bootstrap() {
  ...
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
```
### 3.拦截器获取请求的信息和数据
1. 创建拦截器并进行配置```nest g interceptor transform interceptor```
```js
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` 
                            Request original url: ${req.originalUrl}
                            Method: ${req.method}
                            IP: ${req.ip}
                            User: ${JSON.stringify(req.user)}
                            Response data:\n ${JSON.stringify(data.data)}`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}

```
2. 应用拦截器
```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());// 全局拦截器
  ...
  await app.listen(3000);
}
bootstrap();

```
### 4.过滤器
1. 创建一个简单的异常过滤器
```js
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Logger } from 'src/utils/log4js';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: Record<string, any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const responseObj = exception.getResponse() as any;
    let message = '';
    if (exception.status === 400) {
      message = responseObj.message.map((error) => {
        const info = error.split(':');
        return { field: info[0], message: info[1] };
      });
    } else if (exception.status === 401) {
      message = '用户身份已过期，请重新登录';
    } else if (exception.status === 403) {
      message = '权限不够，请重新登录';
    }
    const logFormat = ` 
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${JSON.stringify(message)} \n `;
    Logger.error(logFormat);
    return response.status(400).json({
      code: status,
      message,
    });
  }
}

```
2. 应用过滤器
```js

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ...
  app.useGlobalFilters(new GlobalFilter());
  ...
  await app.listen(3000);
}
bootstrap();

```
### 5.注意:日志中打印出用户添加的信息
```js
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // 对JSON数据进行解析
  app.use(express.urlencoded({ extended: true })); // 对表单数据进行解析
  // 上面两项可以让
  await app.listen(3000);
}
bootstrap();

```
## 实现登录的挤出效果
### 1.redis配置方法
1. 安装依赖```yarn add ioredis -S```
2. 设置redis配置内容.env
```js
# radis连接信息
redis= {port: 6379,host: '127.0.0.1',db: 0,password: 'root'}
```
3. 建立redis方法
```ts
import Redis from 'ioredis';

const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例
export class RedisInstance {
  static async initRedis(db = 0) {
    const config = process.env.redis as unknown as object;
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      redisList[db] = new Redis({ ...config, db });
      redisIndex.push(db);
    }

    return redisList[db];
  }
}

```
### 2.redis服务和模块
1. 创建redis模块和服务
```cmd
nest g mo redis module --no-spec  
nest g s  redis module --no-spec
```
2. redis模块中导出redis服务引入token服务
```ts
@Module({
  imports: [TokenModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
```
3. redis服务将token存入redis缓存中
```ts
@Injectable()
export class RedisService {
  constructor(private readonly token: TokenService) {}
  async setRedis(user: user) {
    // 拿到token
    const { token } = await this.token.setToken(user);
    // 实例化 redis
    const redis = await RedisInstance.initRedis();
    // 将用户信息和 token 存入 redis，并设置失效时间，语法：[key, seconds, value]
    await redis.setex(`${user.id}-${user.username}`, 300, `${token}`);
  }
}

```
### 3.使用redis方法修改守卫
1. user模块中引入redis模块
```ts
@Module({
  imports: [TokenModule, RedisModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}

```
2. user服务中使用redis服务
```ts
@Injectable()
export class UserService {
  constructor(
    ...
    private redis: RedisService,
  ) {}
    ...
  // 登录的服务
  async login(dto: loginDTO) {
    ...
    // 调用设置redis的服务
    this.redis.setRedis(user);
    return this.token.setToken(user);
  }

  ...
}

```
3. 修改用户的守卫
```ts
// 管理员守卫
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 反射中包含了SetMetadata('roles', roles)放入的全局中，其他守卫可以使用
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // 获取请求头里的 token
    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1];

    // 获取 redis 里缓存的 token
    const redis = await RedisInstance.initRedis();
    const key = `${user.id}-${user.username}`;
    const cacheToken = await redis.get(key); // 缓存的token

    if (token !== cacheToken) {
      // 如果 token 不匹配，禁止访问
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }

    // 第一个用户是管理员
    return user?.id == 1;
  }
}

```
## Swagger生成文档
### 1.安装配置swagger
1. 安装依赖```yarn add @nestjs/swagger swagger-ui-express -S```
2. 在main.ts中添加配置
```ts
async function bootstrap() {
  ...
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('Nest zero to one') // 文章标题
    .setDescription('The nest-zero-to-one API description') // 文章副标题
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  ...
}
bootstrap();

```
### 2.添加默认参数
1. login.dto.ts中添加配置
```ts
export default class loginDTO {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('login', 'user', { message: '该用户不存在' })
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

```
2. register.dto.ts中添加配置
```ts
export default class registerDTO {
  @ApiProperty({ description: '用户名', example: '' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNoExistsRule('register', 'user', { message: '用户名已存在,请更换用户名' })
  username: string;

  @ApiProperty({ description: '密码', example: '' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirmedRule({ message: '确认密码与密码不同' })
  password: string;

  @ApiProperty({ description: '确认密码', example: '' })
  password_confirmed: string;
}

```
### 3.接口类型分类和添加token
1. 在controller.ts文件添加( @ApiTags('类型')
```ts
@ApiTags('用户的注册和登录')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 ...
}

```
2. 添加token选项
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ...
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证,添加token
    .setTitle('Nest zero to one') // 文档标题
    .setDescription('The nest-zero-to-one API description') // 文章副标题
    .setVersion('1.0')
    .build();
  ...
  await app.listen(3000);
}
bootstrap();

```
## 配置vscode的代码片段
1. 生成代码片段网址```https://99cc.vip/public/tools/vscode_snippet/index.html```
2. nest继承系统管道
```json
{
	
"nest继承系统管道": {
	"prefix": "nest继承系统管道",
	"body": [
		"import { ValidationError, ValidationPipe } from '@nestjs/common'",
		"",
		"// 继承系统的管道方法",
		"export class validate extends ValidationPipe {",
		"  protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {",
		"    const errors = super.mapChildrenToValidationErrors(error, parentPath)",
		"    errors.map((error) => {",
		"      // 对错误的内容做简单处理",
		"      for (const key in error.constraints) {",
		"        error.constraints[key] = error.property + ':' + error.constraints[key]",
		"      }",
		"    })",
		"    return errors",
		"  }",
		"}",
		""
	],
	"description": "nest继承系统管道"
}
}
```
3. nest继承系统管道2
```json
{
	
"nest继承系统管道2": {
	"prefix": "nest继承系统管道2",
	"body": [
		"import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'",
		"",
		"// 继承系统的管道方法",
		"export class validate extends ValidationPipe {",
		"  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {",
		"    const errors = {}",
		"    validationErrors.forEach((error) => {",
		"      errors[error.property] = Object.values(error.constraints)[0]",
		"    })",
		"    throw new HttpException({ code: 422, message: errors }, HttpStatus.UNPROCESSABLE_ENTITY)",
		"  }",
		"}",
		""
	],
	"description": "nest继承系统管道2"
}
}
```
4. nest自定义规则装饰器
```json
{
	
"nest自定义规则装饰器": {
	"prefix": "nest自定义规则装饰器",
	"body": [
		"import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'",
		"",
		"export function IsConfirmedRule(validationOptions?: ValidationOptions) {",
		"  return function (object: Record<string, any>, propertyName: string) {",
		"    registerDecorator({",
		"      name: 'IsConfirmedRule',",
		"      target: object.constructor,",
		"      propertyName: propertyName,",
		"      constraints: [],",
		"      options: validationOptions,",
		"      validator: {",
		"        async validate(value: string, args: ValidationArguments) {",
		"          return true",
		"        },",
		"      },",
		"    })",
		"  }",
		"}",
		""
	],
	"description": "nest自定义规则装饰器"
}
}

```
5. nest类规则自定义
```json
{
"nest类规则自定义": {
	"prefix": "nest类规则自定义",
	"body": [
		"import {",
		"  ValidationArguments,",
		"  ValidatorConstraint,",
		"  ValidatorConstraintInterface,",
		"} from 'class-validator';",
		"",
		"@ValidatorConstraint()",
		"export class IsConfirmed implements ValidatorConstraintInterface {",
		"  async validate(value: string, args: ValidationArguments) {",
		"",
		"    return value === args.object[args.property + '_confirmed'];",
		"  }",
		"",
		"  defaultMessage() {",
		"    // 默认消息",
		"    return '数据不匹配';",
		"  }",
		"}",
		""
	],
	"description": "nest类规则自定义"
}
}
```
5. nestJWT策略
```json
{
	
	"nestJWT策略": {
		"prefix": "nestJWT策略",
		"body": [
			"import { PrismaService } from '../module/prisma/prisma.service';",
			"import { ConfigService } from '@nestjs/config';",
			"import { ExtractJwt, Strategy } from 'passport-jwt';",
			"import { PassportStrategy } from '@nestjs/passport';",
			"import { Injectable } from '@nestjs/common';",
			"",
			"@Injectable()",
			"export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {",
			"  constructor(configService: ConfigService, private prisma: PrismaService) {",
			"    super({",
			"      //解析用户提交的header中的Bearer Token数据",
			"      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),",
			"      //加密码的 secret",
			"      secretOrKey: configService.get('TOKEN_SECRET'),",
			"    });",
			"  }",
			"",
			"  //验证通过后获取用户资料",
			"  async validate({ sub: id }) {",
			"    return this.prisma.user.findUnique({",
			"      where: { id },",
			"    });",
			"  }",
			"}"
		],
		"description": "nestJWT策略"
	}
}
```
6. nest包裹data的拦截器
```json
{
	
"nest包裹data的拦截器": {
	"prefix": "nest包裹data的拦截器",
	"body": [
		"import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'",
		"import { map } from 'rxjs/operators'",
		"",
		"@Injectable()",
		"export class TransformInterceptor implements NestInterceptor {",
		"  intercept(context: ExecutionContext, next: CallHandler) {",
		"    return next.handle().pipe(",
		"      map((data) => {",
		"        return data?.meta||data?.data ? data : { data }",
		"      }),",
		"    )",
		"  }",
		"}",
		""
	],
	"description": "nest包裹data的拦截器"
}
}
```
7. nest聚合装饰器
```json
{
"nest聚合装饰器": {
	"prefix": "nest聚合装饰器",
	"body": [
		"import { applyDecorators } from '@nestjs/common';",
		"",
		"export function Auth() {",
		"  return applyDecorators();",
		"}",
		""
	],
	"description": "nest聚合装饰器"
}
}
```
8. nest文件上传过滤器和聚合装饰器
```json
{
	
"nest文件上传过滤器和聚合装饰器": {
	"prefix": "nest文件上传过滤器和聚合装饰器",
	"body": [
		"import { applyDecorators, MethodNotAllowedException, UseInterceptors } from '@nestjs/common'",
		"import { FileInterceptor } from '@nestjs/platform-express'",
		"import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'",
		"",
		"export function fileFilter(type: string) {",
		"  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {",
		"    // 对文件上传类型限制",
		"    if (!file.mimetype.includes(type)) callback(new MethodNotAllowedException('文件类型不允许'), false)",
		"    else callback(null, true)",
		"  }",
		"}",
		"",
		"export function Upload(filed = 'file', options: MulterOptions) {",
		"  return applyDecorators(UseInterceptors(FileInterceptor(filed, options)))",
		"}",
		"",
		"// 上传图片的封装",
		"export function ImageUpload(filed = 'file') {",
		"  return Upload(filed, {",
		"    limits: { fileSize: Math.pow(1024, 2) * 2 }, // 文件大小",
		"    fileFilter: fileFilter('image'),",
		"  })",
		"}",
		""
	],
	"description": "nest文件上传过滤器和聚合装饰器"
}
}
```
9. nest文件上传控制器
```json
{
	
	"nest文件上传控制器": {
		"prefix": "nest文件上传控制器",
		"body": [
			"import { Controller, UseInterceptors, Post, UploadedFile } from '@nestjs/common'",
			"import { TransformInterceptor } from 'src/interceptor/transform.interceptor'",
			"import { ImageUpload } from './upload'",
			"",
			"@Controller('upload')",
			"@UseInterceptors(new TransformInterceptor())",
			"export class UploadController {",
			"  @Post('image')",
			"  @ImageUpload()",
			"  image(@UploadedFile() file: Express.Multer.File) {",
			"    return file",
			"  }",
			"}",
			""
		],
		"description": "nest文件上传控制器"
	}
}
```
10. nest文件上传模块
```json
{
	
	"nest文件上传模块": {
		"prefix": "nest文件上传模块",
		"body": [
			"@Module({",
			"  imports: [",
			"    MulterModule.registerAsync({",
			"      useFactory() {",
			"        return {",
			"          storage: diskStorage({",
			"            //文件储存位置",
			"            destination: 'uploads',",
			"            //文件名定制",
			"            filename: (req, file, callback) => {",
			"              const path =",
			"                Date.now() +",
			"                '-' +",
			"                Math.round(Math.random() * 1e10) +",
			"                extname(file.originalname);",
			"              callback(null, path);",
			"            },",
			"          }),",
			"        };",
			"      },",
			"    }),",
			"  ],",
			"  controllers: [UploadController],",
			"})",
			"export class UploadModule {}",
			""
		],
		"description": "nest文件上传模块"
	}
}
```
11. nest用户守卫
```json
{
	
"nest用户守卫": {
	"prefix": "nest用户守卫",
	"body": [
		"import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'",
		"import { Reflector } from '@nestjs/core'",
		"import { user } from '@prisma/client'",
		"import { Observable } from 'rxjs'",
		"import { Role } from '../decorators/enum'",
		"",
		"@Injectable()",
		"export class RoleGuard implements CanActivate {",
		"  constructor(private reflector: Reflector) {} // 反射中包含了SetMetadata('roles', roles)放入的全局中，其他守卫可以使用",
		"  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {",
		"    // RoleGuard守卫中上下文会获取调用jwt策略中返回的数据",
		"    // context中包含策略返回的用户",
		"    const user = context.switchToHttp().getRequest().user as user",
		"    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()]) // 读取反射中数据",
		"    // 没通过就是403",
		"    return roles ? roles.some((role) => user.role == role) : true",
		"  }",
		"}",
		""
	],
	"description": "nest用户守卫"
}
}
```
12. 日志的配置文件
```json
{
"日志的配置文件": {
	"prefix": "日志的配置文件",
	"body": [
		"import { join } from 'path';",
		"const baseLogPath = join(__dirname, '../../logs'); // 日志要写入哪个目录",
		"",
		"const log4jsConfig = {",
		"  appenders: {",
		"    console: {",
		"      type: 'console', // 会打印到控制台",
		"    },",
		"    access: {",
		"      type: 'dateFile', // 会写入文件，并按照日期分类",
		"      filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log",
		"      alwaysIncludePattern: true,",
		"      pattern: 'yyyyMMdd',",
		"      daysToKeep: 60,",
		"      numBackups: 3,",
		"      category: 'http',",
		"      keepFileExt: true, // 是否保留文件后缀",
		"    },",
		"    app: {",
		"      type: 'dateFile',",
		"      filename: `${baseLogPath}/app-out/app.log`,",
		"      alwaysIncludePattern: true,",
		"      layout: {",
		"        type: 'pattern',",
		"        pattern:",
		"          '{\"date\":\"%d\",\"level\":\"%p\",\"category\":\"%c\",\"host\":\"%h\",\"pid\":\"%z\",\"data\":\'%m\'}',",
		"      },",
		"      // 日志文件按日期（天）切割",
		"      pattern: 'yyyyMMdd',",
		"      daysToKeep: 60,",
		"      numBackups: 3,",
		"      keepFileExt: true,",
		"    },",
		"    errorFile: {",
		"      type: 'dateFile',",
		"      filename: `${baseLogPath}/errors/error.log`,",
		"      alwaysIncludePattern: true,",
		"      layout: {",
		"        type: 'pattern',",
		"        pattern:",
		"          '{\"date\":\"%d\",\"level\":\"%p\",\"category\":\"%c\",\"host\":\"%h\",\"pid\":\"%z\",\"data\":\'%m\'}',",
		"      },",
		"      // 日志文件按日期（天）切割",
		"      pattern: 'yyyyMMdd',",
		"      daysToKeep: 60,",
		"      numBackups: 3,",
		"      keepFileExt: true,",
		"    },",
		"    errors: {",
		"      type: 'logLevelFilter',",
		"      level: 'ERROR',",
		"      appender: 'errorFile',",
		"    },",
		"  },",
		"  categories: {",
		"    default: {",
		"      appenders: ['console', 'app', 'errors'],",
		"      level: 'DEBUG',",
		"    },",
		"    info: { appenders: ['console', 'app', 'errors'], level: 'info' },",
		"    access: { appenders: ['console', 'app', 'errors'], level: 'info' },",
		"    http: { appenders: ['access'], level: 'DEBUG' },",
		"  },",
		"  pm2: true, // 使用 pm2 来管理项目时，打开",
		"  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突",
		"};",
		"",
		"export default log4jsConfig;",
		""
	],
	"description": "日志的配置文件"
}
}

```
13. 日志的工具类
```json
{
"日志的工具类": {
	"prefix": "日志的工具类",
	"body": [
	
		"import * as Path from 'path';",
		"import * as Log4js from 'log4js';",
		"import * as Util from 'util';",
		"import * as Moment from 'moment'; // 处理时间的工具",
		"import * as StackTrace from 'stacktrace-js';",
		"import Chalk from 'chalk';",
		"import config from '../config/log4js';",
		"",
		"// 日志级别",
		"export enum LoggerLevel {",
		"  ALL = 'ALL',",
		"  MARK = 'MARK',",
		"  TRACE = 'TRACE',",
		"  DEBUG = 'DEBUG',",
		"  INFO = 'INFO',",
		"  WARN = 'WARN',",
		"  ERROR = 'ERROR',",
		"  FATAL = 'FATAL',",
		"  OFF = 'OFF',",
		"}",
		"",
		"// 内容跟踪类",
		"export class ContextTrace {",
		"  constructor(",
		"    public readonly context: string,",
		"    public readonly path?: string,",
		"    public readonly lineNumber?: number,",
		"    public readonly columnNumber?: number,",
		"  ) {}",
		"}",
		"",
		"Log4js.addLayout('Awesome-nest', (logConfig: any) => {",
		"  return (logEvent: Log4js.LoggingEvent): string => {",
		"    let moduleName = '';",
		"    let position = '';",
		"",
		"    // 日志组装",
		"    const messageList: string[] = [];",
		"    logEvent.data.forEach((value: any) => {",
		"      if (value instanceof ContextTrace) {",
		"        moduleName = value.context;",
		"        // 显示触发日志的坐标（行，列）",
		"        if (value.lineNumber && value.columnNumber) {",
		"          position = `${value.lineNumber}, ${value.columnNumber}`;",
		"        }",
		"        return;",
		"      }",
		"",
		"      if (typeof value !== 'string') {",
		"        value = Util.inspect(value, false, 3, true);",
		"      }",
		"",
		"      messageList.push(value);",
		"    });",
		"",
		"    // 日志组成部分",
		"    const messageOutput: string = messageList.join(' ');",
		"    const positionOutput: string = position ? ` [${position}]` : '';",
		"    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;",
		"    const dateOutput = `${Moment(logEvent.startTime).format(",
		"      'YYYY-MM-DD HH:mm:ss',",
		"    )}`;",
		"    const moduleOutput: string = moduleName",
		"      ? `[${moduleName}] `",
		"      : '[LoggerService] ';",
		"    let levelOutput = `[${logEvent.level}] ${messageOutput}`;",
		"",
		"    // 根据日志级别，用不同颜色区分",
		"    switch (logEvent.level.toString()) {",
		"      case LoggerLevel.DEBUG:",
		"        levelOutput = Chalk.green(levelOutput);",
		"        break;",
		"      case LoggerLevel.INFO:",
		"        levelOutput = Chalk.cyan(levelOutput);",
		"        break;",
		"      case LoggerLevel.WARN:",
		"        levelOutput = Chalk.yellow(levelOutput);",
		"        break;",
		"      case LoggerLevel.ERROR:",
		"        levelOutput = Chalk.red(levelOutput);",
		"        break;",
		"      case LoggerLevel.FATAL:",
		"        levelOutput = Chalk.hex('#DD4C35')(levelOutput);",
		"        break;",
		"      default:",
		"        levelOutput = Chalk.grey(levelOutput);",
		"        break;",
		"    }",
		"",
		"    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(",
		"      moduleOutput,",
		"    )}${levelOutput}${positionOutput}`;",
		"  };",
		"});",
		"",
		"// 注入配置",
		"Log4js.configure(config);",
		"",
		"// 实例化",
		"const logger = Log4js.getLogger();",
		"logger.level = LoggerLevel.TRACE;",
		"",
		"export class Logger {",
		"  static trace(...args) {",
		"    logger.trace(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static debug(...args) {",
		"    logger.debug(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static log(...args) {",
		"    logger.info(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static info(...args) {",
		"    logger.info(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static warn(...args) {",
		"    logger.warn(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static warning(...args) {",
		"    logger.warn(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static error(...args) {",
		"    logger.error(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static fatal(...args) {",
		"    logger.fatal(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  static access(...args) {",
		"    const loggerCustom = Log4js.getLogger('http');",
		"    loggerCustom.info(Logger.getStackTrace(), ...args);",
		"  }",
		"",
		"  // 日志追踪，可以追溯到哪个文件、第几行第几列",
		"  static getStackTrace(deep = 2): string {",
		"    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();",
		"    const stackInfo: StackTrace.StackFrame = stackList[deep];",
		"",
		"    const lineNumber: number = stackInfo.lineNumber;",
		"    const columnNumber: number = stackInfo.columnNumber;",
		"    const fileName: string = stackInfo.fileName;",
		"    const basename: string = Path.basename(fileName);",
		"    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;",
		"  }",
		"}",
		""
	],
	"description": "日志的工具类"
}
}
```
14. 日志的中间件
```json
{
"日志的中间件": {
	"prefix": "日志的中间件",
	"body": [
		"import { Injectable, NestMiddleware } from '@nestjs/common';",
		"import { Request, Response } from 'express';",
		"import { Logger } from '../utils/log4js';",
		"",
		"@Injectable()",
		"export class ViewsMiddleware implements NestMiddleware {",
		"  use(req: Request, res: Response, next: () => void) {",
		"    const code = res.statusCode; // 响应状态码",
		"    next();",
		"    // 组件日志信息",
		"    const logFormat = `Method:${req.method} \n Request original url:${req.originalUrl} \n IP:${req.ip} \n Status code: ${code} \n`;",
		"    // 根据状态码进行日志区分",
		"    if (code >= 500) {",
		"      Logger.error(logFormat);",
		"    } else if (code >= 400) {",
		"      Logger.warn(logFormat);",
		"    } else {",
		"      Logger.access(logFormat);",
		"      Logger.log(logFormat);",
		"    }",
		"  }",
		"}",
		"",
		"// 函数式中间件",
		"export function logger(req: Request, res: Response, next: () => any) {",
		"  const code = res.statusCode; // 响应状态码",
		"  next();",
		"  // 组装日志信息",
		"  const logFormat = `",
		"                     Request original url:${req.originalUrl}",
		"                     Method:${req.method}",
		"                     IP:${req.ip}",
		"                     Status code:${code}",
		"                     Params:${JSON.stringify(req.params)}",
		"                     Query:${JSON.stringify(req.query)}",
		"                     Body:${JSON.stringify(req.body)} `;",
		"  if (code >= 500) {",
		"    Logger.error(logFormat);",
		"  } else if (code >= 400) {",
		"    Logger.warn(logFormat);",
		"  } else {",
		"    Logger.access(logFormat);",
		"    Logger.log(logFormat);",
		"  }",
		"}",
		""
	],
	"description": "日志的中间件"
}
}
```







