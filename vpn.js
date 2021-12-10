window.start_up = function() {
	import javax.swing.*;
	import org.lobobrowser.html.gui.*;
	import org.lobobrowser.html.test.*;

	public class BareMinimumTest {
	  public static void main(String[] args) throws Exception {
	    JFrame window = new JFrame();
	    HtmlPanel panel = new HtmlPanel();
	    window.getContentPane().add(panel);
	    window.setSize(600, 400);
	    window.setVisible(true);
	    new SimpleHtmlRendererContext(panel, new SimpleUserAgentContext())
	    .navigate("http://lobobrowser.org/browser/home.jsp");
	  }
	}
}
