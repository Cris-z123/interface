<template>
  <el-upload
    drag
    action
    :auto-upload="false"
    :show-file-list="false"
    :on-change="changeFile"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script>
export default {
  methods: {
    // 提交文件后触发
    changeFile() {
      this.filepParse();

      // coding... 进行分片
      // ...

      const buffer = await this.filepParse(file,'buffer')
      const sparkMD5 = new SparkMD5.ArrayBuffer()
      sparkMD5.append(buffer)
      this.hash = sparkMD5.end()
      const partSize = file.size / 10
      let current = 0
      for (let i = 0 ;i < 10 ;i++) {
        let reqItem = {
          chunk: file.slice(current, current + partSize),
          filename: `${this.hash}_${i}.${suffix}`
          }
          current += partSize
          partList.push(reqItem)
          }
      this.partList = partList

      // 创建切片请求
      this.createSendQeq();
      this.sendQeq();
      this.mergeUpload;
    },
    // 将文件变成二进制，方便后续分片
    filepParse(file, type) {
      const caseType = {
        base64: "readAsDataURL",
        buffer: "readAsArrayBuffer",
      };
      const fileRead = new FileReader();
      return new Promise((resolve) => {
        fileRead[caseType[type]](file);
        fileRead.onload = (res) => {
          resolve(res.target.result);
        };
      });
    },
    // 创建切片请求
    createSendQeq() {
      const reqPartList = [];
      this.partList.forEach((item, index) => {
        const reqFn = () => {
          const formData = new FormData();
          formData.append("chunk", item.chunk);
          formData.append("filename", item.filename);
          return axios
            .post("/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              console.log(res);
            });
        };
        reqPartList.push(reqFn);
      });
      return reqPartList;
    },
    // 将每一个切片 并行/串行 的方式发出
    sendQeq() {
      const reqPartList = this.createSendQeq();
      let i = 0;
      let send = async () => {
        if (i >= reqPartList.length) {
          // 上传完成
          this.mergeUpload();
          return;
        }
        await reqPartList[i]();
        i++;
        send();
      };
      send();
    },
    // 发送代码合并请求
    mergeUpload() {},
  },
};
</script>

<style>
</style>