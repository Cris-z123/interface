1. Type 和 interface
2. Enum
3. Class
   * public: 类、类实例、子类中均可访问
   * private: 仅类内部可访问
   * protected: 仅类和子类被访问
4. 泛型
   ```ts
    function print<T>(arg: T): T {
        console.log(typeof arg)
        return arg
    } 
   ```
   ```ts
    // 使用接口定义 
    interface IUser {
        name: string;
        age: number;
        sex: string;
    }
    interface IUserPartial {
        name?: string;
        age?: number;
        sex?: string;
    }
    const user: IUser = { name: 'cat' };
    const user: IUserPartial = { name: 'cat' }
    
    // 使用泛型
    type Partial<T> = {
        [P in keyof T]?: T[P]
    }
    const user:Partial<IUuser> = { name: 'cat' };
   ```
   ```ts
    function merge<T extend U, U>(target: T, source: U): T {
        for(let id in source) {
            target[id] = (<T>source)[id]
        }
        return target
    }
   ```
5. 联合类型
   ```ts
     interface IUser {
        info:
          | {
              vip: true;
              expires: string;
            }
          | {
              vip: false;
              promotion: string;
            };  
    }
   ```
