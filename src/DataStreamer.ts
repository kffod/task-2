export interface Order {
  price: number;
  size: number;
}

export interface ServerRespond {
  stock: string;
  top_bid: Order;
  top_ask: Order;
  timestamp: Date;
}

class DataStreamer {
  static API_URL: string = 'http://localhost:8080/query?id=1';

  static getData(): Promise<ServerRespond[]> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      const timeoutDuration = 10000; // 10 seconds timeout

      request.open('GET', DataStreamer.API_URL, true);
      request.timeout = timeoutDuration;

      request.onload = () => {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(new Error(`Request failed with status: ${request.status}`));
        }
      };

      request.onerror = () => {
        console.error('Network error occurred');
        reject(new Error('Network error occurred'));
      };

      request.ontimeout = () => {
        console.error('Request timed out');
        reject(new Error('Request timed out'));
      };

      request.send();
    });
  }
}

export default DataStreamer;
