1. 为什么`React`使用`JSX`语法？
   主要是方便开发人员书写 VDom，再使用`Babel`进行转化，它使用`React.createElement()`转化 VDom
2. 虚拟 `DOM`
   是一个 `Object` 对象
   虚拟 `DOM` 比真实 `DOM` 更加"轻"
3. `JSX`中只能写`js`表达式
   表达式: 一个表达式产生一个值，可以放在任何一个需要值的地方
   语句: 控制代码逻辑
4. 为什么函数组件没有`this`
   因为使用`Babel`转化后，使用了`use strict`，禁止`this`指向`Window`，变成了 `undefined`
5. js 类

   ```js
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }

     // 这个方法被放在类的原型上
     speak() {
       console.log(`my name is ${this.name}, i am ${this.age} years old.`);
     }
   }

   class Student extends Person {
     constructor(name, age, book) {
       super(name, age);
       this.book = book;
     }

     read() {
       console.log(`${this.name} like ${this.book}`);
     }
   }
   ```

6. class components

   ```jsx
   class Weather extends React.Component {
     constructor(props) {
       super(props);
       this.state = { isHot: false };
       // this.changeWeather = this.changeWeather.bind(this); 绑定了this才是正确的
     }

     changeWeather() {
       return !this.state.isHot;
     }

     render() {
       const { isHot } = this.state;
       return <p onClick={this.changeWeather}>今天很{isHot ? "热" : "冷"}</p>;
     }
   }
   ```

   类被实例化（new）后，this 指向实例对象
   不能调用 changeWeather 方法，因为这时 this 是 undefined,没有指向组件实例

   简写方式：

   ```jsx
   class Weather extends React.Component {
     state = { isHot: false };

     changeWeather = () => {
       const isHot = this.state.isHot;
       this.setState({ isHot: !isHot });
     };

     render() {
       const { isHot } = this.state;
       return <p onClick={this.changeWeather}>今天很{isHot ? "热" : "冷"}</p>;
     }
   }
   ```

   一般来说 `constructor` 不用写

7. setState useState
   React 类组件中不能直接修改状态，要是使用 `setState`
         函数组件中使用`useState()`

8. `props`
   对 props 的限制及默认值

   ```jsx
   class Person extends React.component {
     static propTypes = {
       name: PropTypes.string.isRequired,
       age: propsType.number,
     };

     static defaultProps = {
       name: "暂无",
       age: 0,
     };

     render() {
       return (
         <p>
           我叫{name}，我今年{age}岁
         </p>
       );
     }
   }
   ```

9. `ref`
   它可以拿到真实 dom 节点
   `ref` 的三种使用方式，从旧到新

   ```jsx
   class Weather extends React.Component {

     weatherInput3 = React.createRef()

     changeWeather = () => {
       console.log(this.refs.weatherInput1.value)
       console.log(this.weatherInput2.value)
       console.log(this.weatherInput3.current.value)
     };

     render() {
       const { isHot } = this.state;
       return (
         // 不推荐，过时的使用
         <input ref="weatherInput1" placeholder="请输入天气" type="text" />
         // 最常用（但是每次更新的时候，会调用两次）
         <input ref={currentNode => this.weatherInput2 = currentNode} placeholder="请输入天气" type="text" />
         // 最新的写法
         <input ref={this.weatherInput3} placeholder="请输入天气" type="text" />
         <button onClick={this.changeWeather}>切换天气</button>
         );

     }
   }
   ```

10. 受控、非受控组件
    受控：双向绑定输入值
    非受控：手动操作输入值
    高阶函数：入参是一个函数或调用的返回值依然是一个函数
    函数柯里化：通过函数调用继续返回函数的方式，实现多次接受参数最后统一处理的函数编码形式
    33-36

11. 生命周期
    挂载流程：constructor -> componentWillMount -> render -> componentDidMount
    父组件 render：componentWillReceiveProps -> shouldComponentUpdate(setState()) -> componentWillUpdate(forceUpdate()) -> render -> componentDidUpdate
    卸载：componentWillUnmount
