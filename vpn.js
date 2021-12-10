window.start_up = function() {
	package java.lang.reflect;

	import java.lang.ref.WeakReference;
	import java.security.AccessController;
	import java.security.PrivilegedAction;
	import java.util.Arrays;
	import java.util.IdentityHashMap;
	import java.util.Map;
	import java.util.Objects;
	import java.util.concurrent.atomic.AtomicLong;
	import java.util.function.BiFunction;
	import sun.misc.ProxyGenerator;
	import sun.misc.VM;
	import sun.reflect.CallerSensitive;
	import sun.reflect.Reflection;
	import sun.reflect.misc.ReflectUtil;
	import sun.security.util.SecurityConstants;

	public class Proxy implements java.io.Serializable {

	private static final long serialVersionUID = -2222568056686623797L;

	/** parameter types of a proxy class constructor */
	private static final Class<?>[] constructorParams =
	{ InvocationHandler.class };

	/**
	* a cache of proxy classes
	*/
	private static final WeakCache<ClassLoader, Class<?>[], Class<?>>
	proxyClassCache = new WeakCache<>(new KeyFactory(), new ProxyClassFactory());

	/**
	* the invocation handler for this proxy instance.
	* @serial
	*/
	protected InvocationHandler h;

	/**
	* Prohibits instantiation.
	*/
	private Proxy() {
	}

	protected Proxy(InvocationHandler h) {
	Objects.requireNonNull(h);
	this.h = h;
	}

	
	@CallerSensitive
	public static Class<?> getProxyClass(ClassLoader loader,
				 Class<?>... interfaces)
	throws IllegalArgumentException
	{
	SecurityManager sm = System.getSecurityManager();
	if (sm != null) {
	checkProxyAccess(Reflection.getCallerClass(), loader, interfaces);
	}

	return getProxyClass0(loader, interfaces);
	}

	
	private static void checkProxyAccess(Class<?> caller,
				 ClassLoader loader,
				 Class<?>... interfaces)
	{
	SecurityManager sm = System.getSecurityManager();
	if (sm != null) {
	ClassLoader ccl = caller.getClassLoader();
	if (VM.isSystemDomainLoader(loader) && !VM.isSystemDomainLoader(ccl)) {
	sm.checkPermission(SecurityConstants.GET_CLASSLOADER_PERMISSION);
	}
	ReflectUtil.checkProxyPackageAccess(ccl, interfaces);
	}
	}

	/**
	* Generate a proxy class.  Must call the checkProxyAccess method
	* to perform permission checks before calling this.
	*/
	private static Class<?> getProxyClass0(ClassLoader loader,
				   Class<?>... interfaces) {
	if (interfaces.length > 65535) {
	throw new IllegalArgumentException("interface limit exceeded");
	}

	// If the proxy class defined by the given loader implementing
	// the given interfaces exists, this will simply return the cached copy;
	// otherwise, it will create the proxy class via the ProxyClassFactory
	return proxyClassCache.get(loader, interfaces);
	}

	/*
	* a key used for proxy class with 0 implemented interfaces
	*/
	private static final Object key0 = new Object();

	/*
	* Key1 and Key2 are optimized for the common use of dynamic proxies
	* that implement 1 or 2 interfaces.
	*/

	/*
	* a key used for proxy class with 1 implemented interface
	*/
	private static final class Key1 extends WeakReference<Class<?>> {
	private final int hash;

	Key1(Class<?> intf) {
	super(intf);
	this.hash = intf.hashCode();
	}

	@Override
	public int hashCode() {
	return hash;
	}

	@Override
	public boolean equals(Object obj) {
	Class<?> intf;
	return this == obj ||
	   obj != null &&
	   obj.getClass() == Key1.class &&
	   (intf = get()) != null &&
	   intf == ((Key1) obj).get();
	}
	}

	/*
	* a key used for proxy class with 2 implemented interfaces
	*/
	private static final class Key2 extends WeakReference<Class<?>> {
	private final int hash;
	private final WeakReference<Class<?>> ref2;

	Key2(Class<?> intf1, Class<?> intf2) {
	super(intf1);
	hash = 31 * intf1.hashCode() + intf2.hashCode();
	ref2 = new WeakReference<Class<?>>(intf2);
	}

	@Override
	public int hashCode() {
	return hash;
	}

	@Override
	public boolean equals(Object obj) {
	Class<?> intf1, intf2;
	return this == obj ||
	   obj != null &&
	   obj.getClass() == Key2.class &&
	   (intf1 = get()) != null &&
	   intf1 == ((Key2) obj).get() &&
	   (intf2 = ref2.get()) != null &&
	   intf2 == ((Key2) obj).ref2.get();
	}
	}

	/*
	* a key used for proxy class with any number of implemented interfaces
	* (used here for 3 or more only)
	*/
	private static final class KeyX {
	private final int hash;
	private final WeakReference<Class<?>>[] refs;

	@SuppressWarnings("unchecked")
	KeyX(Class<?>[] interfaces) {
	hash = Arrays.hashCode(interfaces);
	refs = (WeakReference<Class<?>>[])new WeakReference<?>[interfaces.length];
	for (int i = 0; i < interfaces.length; i++) {
	refs[i] = new WeakReference<>(interfaces[i]);
	}
	}

	@Override
	public int hashCode() {
	return hash;
	}

	@Override
	public boolean equals(Object obj) {
	return this == obj ||
	   obj != null &&
	   obj.getClass() == KeyX.class &&
	   equals(refs, ((KeyX) obj).refs);
	}

	private static boolean equals(WeakReference<Class<?>>[] refs1,
			      WeakReference<Class<?>>[] refs2) {
	if (refs1.length != refs2.length) {
	return false;
	}
	for (int i = 0; i < refs1.length; i++) {
	Class<?> intf = refs1[i].get();
	if (intf == null || intf != refs2[i].get()) {
	    return false;
	}
	}
	return true;
	}
	}

	/**
	* A function that maps an array of interfaces to an optimal key where
	* Class objects representing interfaces are weakly referenced.
	*/
	private static final class KeyFactory
	implements BiFunction<ClassLoader, Class<?>[], Object>
	{
	@Override
	public Object apply(ClassLoader classLoader, Class<?>[] interfaces) {
	switch (interfaces.length) {
	case 1: return new Key1(interfaces[0]); // the most frequent
	case 2: return new Key2(interfaces[0], interfaces[1]);
	case 0: return key0;
	default: return new KeyX(interfaces);
	}
	}
	}

	/**
	* A factory function that generates, defines and returns the proxy class given
	* the ClassLoader and array of interfaces.
	*/
	private static final class ProxyClassFactory
	implements BiFunction<ClassLoader, Class<?>[], Class<?>>
	{
	// prefix for all proxy class names
	private static final String proxyClassNamePrefix = "$Proxy";

	// next number to use for generation of unique proxy class names
	private static final AtomicLong nextUniqueNumber = new AtomicLong();

	@Override
	public Class<?> apply(ClassLoader loader, Class<?>[] interfaces) {

	Map<Class<?>, Boolean> interfaceSet = new IdentityHashMap<>(interfaces.length);
	for (Class<?> intf : interfaces) {
	/*
	 * Verify that the class loader resolves the name of this
	 * interface to the same Class object.
	 */
	Class<?> interfaceClass = null;
	try {
	    interfaceClass = Class.forName(intf.getName(), false, loader);
	} catch (ClassNotFoundException e) {
	}
	if (interfaceClass != intf) {
	    throw new IllegalArgumentException(
		intf + " is not visible from class loader");
	}
	/*
	 * Verify that the Class object actually represents an
	 * interface.
	 */
	if (!interfaceClass.isInterface()) {
	    throw new IllegalArgumentException(
		interfaceClass.getName() + " is not an interface");
	}
	/*
	 * Verify that this interface is not a duplicate.
	 */
	if (interfaceSet.put(interfaceClass, Boolean.TRUE) != null) {
	    throw new IllegalArgumentException(
		"repeated interface: " + interfaceClass.getName());
	}
	}

	String proxyPkg = null;     // package to define proxy class in
	int accessFlags = Modifier.PUBLIC | Modifier.FINAL;

	/*
	* Record the package of a non-public proxy interface so that the
	* proxy class will be defined in the same package.  Verify that
	* all non-public proxy interfaces are in the same package.
	*/
	for (Class<?> intf : interfaces) {
	int flags = intf.getModifiers();
	if (!Modifier.isPublic(flags)) {
	    accessFlags = Modifier.FINAL;
	    String name = intf.getName();
	    int n = name.lastIndexOf('.');
	    String pkg = ((n == -1) ? "" : name.substring(0, n + 1));
	    if (proxyPkg == null) {
		proxyPkg = pkg;
	    } else if (!pkg.equals(proxyPkg)) {
		throw new IllegalArgumentException(
		    "non-public interfaces from different packages");
	    }
	}
	}

	if (proxyPkg == null) {
	// if no non-public proxy interfaces, use com.sun.proxy package
	proxyPkg = ReflectUtil.PROXY_PACKAGE + ".";
	}

	/*
	* Choose a name for the proxy class to generate.
	*/
	long num = nextUniqueNumber.getAndIncrement();
	String proxyName = proxyPkg + proxyClassNamePrefix + num;

	/*
	* Generate the specified proxy class.
	*/
	byte[] proxyClassFile = ProxyGenerator.generateProxyClass(
	proxyName, interfaces, accessFlags);
	try {
	return defineClass0(loader, proxyName,
			    proxyClassFile, 0, proxyClassFile.length);
	} catch (ClassFormatError e) {
	/*
	 * A ClassFormatError here means that (barring bugs in the
	 * proxy class generation code) there was some other
	 * invalid aspect of the arguments supplied to the proxy
	 * class creation (such as virtual machine limitations
	 * exceeded).
	 */
	throw new IllegalArgumentException(e.toString());
	}
	}
	}


	@CallerSensitive
	public static Object newProxyInstance(ClassLoader loader,
				  Class<?>[] interfaces,
				  InvocationHandler h)
	throws IllegalArgumentException
	{
	Objects.requireNonNull(h);

	final SecurityManager sm = System.getSecurityManager();
	if (sm != null) {
	checkProxyAccess(Reflection.getCallerClass(), loader, interfaces);
	}

	/*
	* Look up or generate the designated proxy class.
	*/
	Class<?> cl = getProxyClass0(loader, interfaces);

	/*
	* Invoke its constructor with the designated invocation handler.
	*/
	try {
	if (sm != null) {
	checkNewProxyPermission(Reflection.getCallerClass(), cl);
	}

	final Constructor<?> cons = cl.getConstructor(constructorParams);
	final InvocationHandler ih = h;
	if (!Modifier.isPublic(cl.getModifiers())) {
	AccessController.doPrivileged(new PrivilegedAction<Void>() {
	    public Void run() {
		cons.setAccessible(true);
		return null;
	    }
	});
	}
	return cons.newInstance(new Object[]{h});
	} catch (IllegalAccessException|InstantiationException e) {
	throw new InternalError(e.toString(), e);
	} catch (InvocationTargetException e) {
	Throwable t = e.getCause();
	if (t instanceof RuntimeException) {
	throw (RuntimeException) t;
	} else {
	throw new InternalError(t.toString(), t);
	}
	} catch (NoSuchMethodException e) {
	throw new InternalError(e.toString(), e);
	}
	}

	private static void checkNewProxyPermission(Class<?> caller, Class<?> proxyClass) {
	SecurityManager sm = System.getSecurityManager();
	if (sm != null) {
	if (ReflectUtil.isNonPublicProxyClass(proxyClass)) {
	ClassLoader ccl = caller.getClassLoader();
	ClassLoader pcl = proxyClass.getClassLoader();

	// do permission check if the caller is in a different runtime package
	// of the proxy class
	int n = proxyClass.getName().lastIndexOf('.');
	String pkg = (n == -1) ? "" : proxyClass.getName().substring(0, n);

	n = caller.getName().lastIndexOf('.');
	String callerPkg = (n == -1) ? "" : caller.getName().substring(0, n);

	if (pcl != ccl || !pkg.equals(callerPkg)) {
	    sm.checkPermission(new ReflectPermission("newProxyInPackage." + pkg));
	}
	}
	}
	}

	/**
	* Returns true if and only if the specified class was dynamically
	* generated to be a proxy class using the {@code getProxyClass}
	* method or the {@code newProxyInstance} method.
	*
	* <p>The reliability of this method is important for the ability
	* to use it to make security decisions, so its implementation should
	* not just test if the class in question extends {@code Proxy}.
	*
	* @param   cl the class to test
	* @return  {@code true} if the class is a proxy class and
	*          {@code false} otherwise
	* @throws  NullPointerException if {@code cl} is {@code null}
	*/
	public static boolean isProxyClass(Class<?> cl) {
	return Proxy.class.isAssignableFrom(cl) && proxyClassCache.containsValue(cl);
	}

	@CallerSensitive
	public static InvocationHandler getInvocationHandler(Object proxy)
	throws IllegalArgumentException
	{
	/*
	* Verify that the object is actually a proxy instance.
	*/
	if (!isProxyClass(proxy.getClass())) {
	throw new IllegalArgumentException("not a proxy instance");
	}

	final Proxy p = (Proxy) proxy;
	final InvocationHandler ih = p.h;
	if (System.getSecurityManager() != null) {
	Class<?> ihClass = ih.getClass();
	Class<?> caller = Reflection.getCallerClass();
	if (ReflectUtil.needsPackageAccessCheck(caller.getClassLoader(),
					    ihClass.getClassLoader()))
	{
	ReflectUtil.checkPackageAccess(ihClass);
	}
	}

	return ih;
	}

	private static native Class<?> defineClass0(ClassLoader loader, String name,
					byte[] b, int off, int len);
	}
}
