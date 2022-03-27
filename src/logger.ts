export default class Logger {
  
  error(message: string) {
    console.log(`ERROR: ${message}`);
    console.trace();
  }

  success(message: string) {
    console.log(`SUCCESS: ${message}`);
  }

  log(message: string) {
    console.log(`LOG: ${message}`);
  }
}