import { spawn } from "child_process";
import { StringDecoder } from "string_decoder";

var decoder = new StringDecoder("utf8");
const proc = spawn("python2", ["--version"]);
proc.stdout.on("data", (data) => {
  var message = decoder.write(data);
  console.log("hello", message.trim());
});
