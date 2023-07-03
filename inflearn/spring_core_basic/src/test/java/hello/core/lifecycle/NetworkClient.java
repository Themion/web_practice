package hello.core.lifecycle;

public class NetworkClient {
  private String url;

  public NetworkClient() {
    System.out.println("생성자 호출, url = " + this.url);

    connect();
    call("초기화 연결 메세지");
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public void connect() {
    System.out.println("connect: " + this.url);
  }

  public void call(String message) {
    System.out.println("Call: " + this.url + ", message: " + message);
  }

  public void disconnect() {
    System.out.println("disconnect: " + this.url);
  }
}
