## 异步编程

### 子进程
* python调度的最小资源单元
* 创建一个子进程后，全局是有两个进程，一个主进程，一个子进程
* 一个进程内存在多个线程
* 进程间不共享内容
* cpu核心越多，支持同时并行的线程就越多

```py
from multiprocessing import Process

p1 = Process() # 创建一个子进程，由主线程管理

p1.start() # 启动子进程
```

### 进程池
```py
from multiprocessing import Pool

process_pool = Pool(2) # 创建进程池,最多创建2个子进程

process_pool.apply() # 从进程池创建一个子进程并执行，但是它会阻塞

process_pool.apply_async() # 从进程池创建一个子进程并异步执行，但是线程池管理的异步子进程，主线程不会管理，所以需要手动关闭并join，避免主线程直接关闭
process_pool.close() # 关闭线程池
process_pool.join() # 阻塞主线程
```

### 进程间通信
```py
q = Queue() # 创建一个共享的队列，任何一个子进程都可以进行写入和读取
q.put()
q.get() # 阻塞函数


pi = Pipe(0) # 创建一个管道，只允许两个子进程进行写入和读取
pi.send()
pi.recv() # 阻塞函数
```

### 子线程
* CPU调度的基本单位
* 一个进程里可以有多个线程交替执行任务（并发）
* 每个进程至少有一个线程（主线程）
* GIL（全局解释器锁）：每个线程执行都需要先获取GIL，保证同一时刻只有一个线程可以执行，即只有一个线程可以占用CPU

```py
from threading import Thread

t1 = Thread() # 创建一个子线程

t1.start() # 启动子线程
```

* 守护线程：可以将一个子线程设置为守护线程，主线程任务一旦完成，所有子线程和主线程一起结束即使子线程没有完成
```py
t2 = Thread(target=xx, args=(1,), daemon=True) # daemon守护线程参数，默认为False

t2.start()
```

* 线程安全：线程间可以共享全局变量，当多个线程同时访问一个对象，不管怎么计算，都可以获得正确结果，就是线程安全，如果出现脏数据，则线程不安全
```py
from threading import Thread

t1 = Thread()
t2 = Thread()

t1.start()
t1.join() # 通过阻塞函数，让进程顺序执行，保证线程安全
t2.join()
```

```py
from threading import Thread, Lock

lock = Lock() # 创建锁

g_num = 0

def sum_1():
    with lock: # 互斥锁，保证线程安全，用with 等价于 lock.acquire (获取锁) 执行结束后 lock.release（释放锁）
        for i in range(10000000):
            global g_num
            n += 1
    print(f'线程1:result{g_num}')

def sum_2():
    with lock:
        for i in range(10000000):
            global g_num
            n += 1
    print(f'线程2:result{g_num}')

if __name__ == '__main__'
    t1 = Thread(target=sum_1)
    t2 = Thread(target=sum_2)

    t1.start()
    t2.start()
```
* 死锁：获取锁之后，锁没有释放，导致线程一直阻塞
* 协程：用户态（可以由人控制多协程的切换）的轻量级线程（在线程里的子线程）
```py
import asyncio

# 异步函数，也就是py的协程
async def test1():
    print("hello")
    await asyncio.sleep(1) # 切换协程
    print("123")

async def test2():
    print("456")
    await asyncio.sleep(1) # 切换协程
    print("789")


# 启动协程
asyncio.run(test1())

await asyncio.gather(test1(), test2()) # 并发执行协程

await asyncio.wait([test1, test2]) # 并发执行协程

# 通过create_task，也可以并发执行协程，但是同步的写法
task1 = asyncio.create_task(test1())
task2 = asyncio.create_task(test2())
await task1
await task2

task1.cancel() # 取消协程
task1.add_done_callback(callback) # 协程执行完毕后回调
```

* 高并发的最佳实践：多进程+协程
