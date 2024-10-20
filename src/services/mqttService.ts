import mqtt from 'mqtt';

class MQTTService {
  private client: mqtt.MqttClient;

  constructor() {
    // Conectar al broker MQTT (puedes cambiar la URL al de tu broker privado si lo prefieres)
    this.client = mqtt.connect('wss://test.mosquitto.org:8081');

    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.subscribeToTopics();
    });

    this.client.on('message', (topic, message) => {
      this.handleMessage(topic, message.toString());
    });
  }

  subscribeToTopics() {
    // Suscribirse a los topics relevantes (publicados por los Arduinos)
    this.client.subscribe('arduino/hit');  // Suscripción para los golpes detectados
  }

  handleMessage(topic: string, message: string) {
    if (topic === 'arduino/hit') {
      console.log('Golpe detectado en:', message);
      // Aquí puedes actualizar el estado de tu aplicación para reflejar los eventos de golpe
    }
  }

  publish(topic: string, message: string) {
    // Enviar mensajes al broker MQTT (por ejemplo, para controlar LEDs)
    this.client.publish(topic, message);
  }
}

export default new MQTTService();