class IntervalMap {

  constructor() {
    this.start_times = [];
    this.end_times = [];
    this.empty = true;
    this.count = 0;
  }

  add(event) {
    if(!event.end) {
        throw "Can't add event to imap without end time.";
        return;
    }
    if(this.empty) this.empty = false; 
    this.start_times.push({ time: event.start, event: event });
    this.end_times.push({ time: event.end, event: event });
    this.count++;
  }

  // Currently unoptimized query method, could be improved using binary
  // searches.
  query(time) {
    if(this.empty) {
      console.log("Warning, trying to query empty imap");
    }
    
    const events = [];
    for(let i = 0; i < this.count; i++) {
      if(time >= this.start_times[i].time) {
        if(time <= this.end_times[i].time) {
          events.push(this.start_times[i].event);
        }
      }
    }

    return events;
  }
}

module.exports = { IntervalMap };