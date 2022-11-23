//Requerimos nuestros enum's
const enum_ = require('./enum');

//Exportamos una función que genera una respuesta recibiendo una serie de
//argumentos conformando un objeto informativo con status e info. 

//Este objeto será el que recibamos como respuesta al realizar una petición
exports.ResponseService = async (status, errorCode, message, data) => {
  return await {
    status: status,
    info: { errorCode: errorCode, message: message, data: data },
  };
};
//Exportamos una serie de funciones que nos muestre por consola un mensaje
//en diferentes colores para conocer el estado del log
exports.LogSuccess = (msg) => {
  console.log(enum_.GREEN_LOG, msg);
};
exports.LogInfo = (msg) => {
  console.log(enum_.CYAN_LOG, msg);
};
exports.LogWarning = (msg) => {
  console.log(enum_.YELLOW_LOG, msg);
};
exports.LogDanger = (msg) => {
  console.log(enum_.RED_LOG, msg);
};