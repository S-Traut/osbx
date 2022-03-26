const { EVENT_TYPES } = require("./utils.js");

function parseValues(values, isTime) {
  if(Array.isArray(values)) {
    let stringified = '';
    values.map((s) => {
      stringified += `${s},`
    });
    return stringified.slice(0, -1);;
  } else {
    return isTime ? `${values},` : `${values}`;
  }
}

function isValid(event) {
  const type = EVENT_TYPES.get(event.type);

  
  if(!type) {
    console.trace();  
    console.log(event);
    throw `This event type is not allowed '${event.type}'\nAllowed events: ${EVENT_TYPES.values()}\n`;    
  }

  const sval_size = Array.isArray(event.start_values) ? event.start_values.length : 1;
  const eval_size = Array.isArray(event.end_values) ? event.start_values.length : 1;

  if(sval_size != type) {
    console.trace();
    console.log(event);
    throw `Start value(s) given for the event of type '${event.type}' are not valid\n given: ${sval_size} -> required: ${type}\n`;
  }

  if(event.end_values && eval_size != type) {
    console.trace();
    throw `End value(s) given for the event of type '${event.type}' are not valid\n given: ${eval_size} -> required: ${type}\n`;
  }

  return true;
}

function newEvent(type, times, values, easing = 0) {
  let start_values = values;
  let end_values = null;
  values = sanitizeValues(values);

  if(Array.isArray(values) && Array.isArray(times)) {
    const half = Math.ceil(values.length / 2);
    start_values = values.slice(0, half);
    end_values = values.slice(-half);
  }

  const event = {
    type: type,
    easing: easing,
    start: Array.isArray(times) ? times[0] : times,
    end: Array.isArray(times) ? times[1] : null,
    start_values: start_values,
    end_values: end_values,
    stringified: ` ${type},${easing},${parseValues(times, true)},${parseValues(values)}`
  };

  if(isValid(event))
    return event;
}

function newParam(start, end, type) {
  const param = {
    type: type,
    start: start,
    end: end,
    stringified: ` P,0,${start},${end},${type}`
  };
  return param;
}

function sanitizeValues(values) {
  if(!Array.isArray(values))
    return parseFloat(values.toFixed(4));

  return values.map((v) => {
    let decimals = 0;
    const str = String(v);
    if(str.includes('.')) {
      decimals = str.split('.')[1].length;
    }

    if(decimals > 4) {
      return parseFloat(v.toFixed(4));
    }
    return v;
  });
}

module.exports = { newEvent, newParam }; 