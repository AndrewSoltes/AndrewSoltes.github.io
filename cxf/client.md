---
title: Client
layout: kb
---

Run wsdl2java

	apache-cxf-3.1.10\bin\wsdl2java\wsdl2java -d <output-dir> -clientjar client.jar <wsdl-file>

Delete java files

	rmdir /S/Q <output-dir>\com

Add jars to project from CXF ([7] optional for Java 7)

	- cxf-core.jar
	- cxf-rt-bindings-soap-3.1.10.jar
	- cxf-rt-bindings-xml-3.1.10.jar
	- cxf-rt-frontend-jaxws-3.1.10.jar
	- cxf-rt-frontend-simple-3.1.10.jar
	- cxf-rt-databinding-jaxb-3.1.10.jar
	- cxf-rt-databinding-xmlbeans.jar
	- cxf-rt-transports-http-3.1.10.jar
	- cxf-rt-wsdl-3.1.10.jar
	- cxf-rt-ws-addr-3.1.10.jar
	- cxf-rt-ws-policy-3.1.10.jar
	- geronimo-javamail.jar (Or the Sun equivalent) [7]
	  (MAY be able to remove javamail if you don't use any MIME/MTOM/SAAJ type things)
	- jaxb-api.jar  [7]
	- jaxb-core.jar  [7]
	- jaxb-impl.jar
	- jcl-over-slf4j.jar
	- neethi-3.0.3.jar
	- slf4j-*.jar
	- stax2-api.jar
	- woodstox-core-asl.jar
	- xmlbeans.jar
	- xmlschema-core.jar

For operation in wsdl:
{% highlight xml %}
<wsdl:binding name="EventHandlerServiceHttpBinding" type="tns:EHProxy">
...
	<wsdl:operation name="AML_CDD_PRE_UpdateNextReviewDateService">
	  <wsdlsoap:operation soapAction=""/>
	  <wsdl:input name="AML_CDD_PRE_UpdateNextReviewDateServiceRequest">
		<wsdlsoap:body use="literal" namespace="http://eh.actimize.com"/>
	  </wsdl:input>
	  <wsdl:output name="AML_CDD_PRE_UpdateNextReviewDateServiceResponse">
		<wsdlsoap:body use="literal" namespace="http://eh.actimize.com"/>
	  </wsdl:output>
	</wsdl:operation>
...
</wsdl:binding>
<wsdl:service name="EventHandlerService">
	<wsdl:port name="EventHandlerServiceHttpPort" binding="tns:EventHandlerServiceHttpBinding">
	  ...
	</wsdl:port>
</wsdl:service>
{% endhighlight %}

Get service, port and operation. They will be named according to wsdl. Note you may need ObjectFactory class to create
JAXBElement(s):
{% highlight java %}
EventHandlerService service = new EventHandlerService();
	
EHProxy port = service.getEventHandlerServiceHttpPort();
port.amlCDDPREUpdateNextReviewDateService(...)
{% endhighlight %}

Full code for request with config and logging:
{% highlight java %}
// create config and logger, populate config with your values
Configuration config = new Configuration();
// implement Logger interface to log wherever you want
Logger log = new ConsoleLogger();


// get service and port
AdcActimizeBeServiceImplService service = new AdcActimizeBeServiceImplService();
AdcActimizeBeService port = service.getAdcActimizeBeServiceImplPort();
// set target url
java.util.Map<String, Object> ctx = ((BindingProvider) port).getRequestContext();
ctx.put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, config.getUrl());
Client client = ClientProxy.getClient(port);

// logging of messages intercepted in CXF  
client.getOutInterceptors().add(new LoggingOutInterceptor(log));
//client.getOutFaultInterceptors().add(new FaultLogger(log));
client.getInInterceptors().add(new LoggingInInterceptor(log));
//client.getInFaultInterceptors().add(new LoggingInInterceptor(log));
// handling logging of faults
client.getBus().getProperties().put("org.apache.cxf.logging.FaultListener", new FaultLogger(log));

// set chunking and timeout
HTTPConduit http = (HTTPConduit) client.getConduit();
HTTPClientPolicy httpClientPolicy = http.getClient();
httpClientPolicy.setConnectionTimeout(config.getConnectionTimeout() * 1000);
httpClientPolicy.setReceiveTimeout(config.getReceiveTimeout() * 1000);
httpClientPolicy.setAllowChunking(config.isChunking());
http.setClient(httpClientPolicy);
if (config.isDisableCNCheck()) {
	TLSClientParameters tlsParams = new TLSClientParameters();
	tlsParams.setDisableCNCheck(true);
	http.setTlsClientParameters(tlsParams);
}

ResponseGetActimizeStatus response = null;
// 0 retries is 1 call
int retries = config.getNumberOfRetries() + 1;
while (retries > 0) {
	retries--;
	try {
		response = port.getActimizeStatus(request);
	} catch (Throwable e) {
		log.error("Connecting to " + config.getUrl() + " caused an error. Retries left: " + retries, e);
		continue;
	}
	break;
}

if (response == null) {
	log.error("Could not connect to " + config.getUrl());
}

log.debug("Response from service returned returnCode=" + response.getReturnCode()+ ", returnMessage=" + 
		response.getReturnMessage());
{% endhighlight %}

*Forthcoming classes packed in zip:*
[cxf.zip](cxf.zip)


Config class:
{% highlight java %}
public class Configuration {

	String url;
	String mode;
	boolean chunking;
	int numberOfRetries;
	int connectionTimeout;
	int receiveTimeout;
	boolean disableCNCheck = false;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public boolean isChunking() {
		return chunking;
	}
	public void setChunking(boolean chunking) {
		this.chunking = chunking;
	}
	public int getNumberOfRetries() {
		return numberOfRetries;
	}
	public void setNumberOfRetries(int numberOfRetries) {
		this.numberOfRetries = numberOfRetries;
	}
	public int getConnectionTimeout() {
		return connectionTimeout;
	}
	public void setConnectionTimeout(int connectionTimeout) {
		this.connectionTimeout = connectionTimeout;
	}
	public int getReceiveTimeout() {
		return receiveTimeout;
	}
	public void setReceiveTimeout(int receiveTimeout) {
		this.receiveTimeout = receiveTimeout;
	}
	public boolean isDisableCNCheck() {
		return disableCNCheck;
	}
	public void setDisableCNCheck(boolean disableCNCheck) {
		this.disableCNCheck = disableCNCheck;
	}
}
{% endhighlight %}

Loggers:
{% highlight java %}
public interface Logger {

	public abstract void info(String message);

	public abstract void debug(String message);

	public abstract void error(String message, Throwable t);

	public abstract void error(String message);

}


public class ConsoleLogger implements Logger {

	@Override
	public void info(String message) {
		System.out.println("[INFO] " + message);
	}

	@Override
	public void debug(String message) {
		System.out.println("[DEBUG] " + message);

	}

	@Override
	public void error(String message, Throwable t) {
		System.out.println("[ERROR] " + message);
		t.printStackTrace();
	}

	@Override
	public void error(String message) {
		System.out.println("[ERROR] " + message);
	}

}


public class FaultLogger implements org.apache.cxf.logging.FaultListener {

	Logger logger;
	
	public FaultLogger(Logger logger) {
		super();
		this.logger = logger;
	}

	@Override
	public boolean faultOccurred(Exception e, String description, Message message) {
		logger.error(description + "\n" + e.getMessage(), e);
		return false;
	}

}


public class LoggingInInterceptor extends AbstractPhaseInterceptor<Message> {

	Logger logger;
	
	public LoggingInInterceptor(Logger logger) {
		super(Phase.RECEIVE);
		this.logger = logger;
	}
	
	public LoggingInInterceptor(String phase, Logger logger) {
		super(phase);
		this.logger = logger;
	}

	public Logger getLogger() {
		return logger;
	}

	public void setLogger(Logger logger) {
		this.logger = logger;
	}

	@Override
	public void handleMessage(Message message) throws Fault {
		InputStream is = message.getContent(InputStream.class);
		String msg = null;
		if (is != null) {
			CachedOutputStream os = new CachedOutputStream();
			os.registerCallback(new LoggingCallback(logger, "Received message: \n"));
			try {
				IOUtils.copy(is, os);
				message.setContent(InputStream.class, os.getInputStream());
				os.close();
			} catch (IOException e1) {
				logger.error("Error while getting incoming message's xml for debug logging.", e1);
			}
		} else {
			Reader reader = message.getContent(Reader.class);
			if (reader != null) {
				Scanner scanner = new Scanner(reader).useDelimiter("\\A");
				if (scanner.hasNext()) {
					msg = scanner.next();
				}
				if (msg != null) {
					StringReader outReader = new StringReader(msg);
					message.setContent(Reader.class, outReader);
				}
				logger.debug(msg);
			}
		}
	}
}


public class LoggingCallback implements CachedOutputStreamCallback {
	Logger logger;
	String prefix;
	
    public LoggingCallback(Logger logger, String prefix) {
		this.logger = logger;
		this.prefix = prefix;
	}

	public void onFlush(CachedOutputStream cos) {
    }

    public void onClose(CachedOutputStream cos) {
        try {
            StringBuilder builder = new StringBuilder(prefix);
            cos.writeCacheTo(builder);
            String soapXml = builder.toString();
            logger.debug(soapXml);
        } catch (Exception e) {
        	logger.error("Cannot log outgoing message.", e);
        }
    }
}



public class LoggingOutInterceptor extends org.apache.cxf.interceptor.LoggingOutInterceptor {

	Logger logger;
	
	public LoggingOutInterceptor(Logger logger) {
		super(Phase.PRE_STREAM);
		this.logger = logger;
	}

	@Override
	public void handleMessage(Message message) throws Fault {
		OutputStream out = message.getContent(OutputStream.class);
		final CacheAndWriteOutputStream newOut = new CacheAndWriteOutputStream(out);
		message.setContent(OutputStream.class, newOut);
		newOut.registerCallback(new LoggingCallback(logger, "Sent message: \n"));
	}
}
{% endhighlight %}