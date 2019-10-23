2019-08-20T09:33:20.655+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2019-08-20T09:33:20.658+0800 I CONTROL  [initandlisten] MongoDB starting : pid=9304 port=27017 dbpath=D:\项目\problem_node\data 64-bit host=ISS-20180417MFP
2019-08-20T09:33:20.658+0800 I CONTROL  [initandlisten] targetMinOS: Windows 7/Windows Server 2008 R2
2019-08-20T09:33:20.658+0800 I CONTROL  [initandlisten] db version v4.0.5
2019-08-20T09:33:20.659+0800 I CONTROL  [initandlisten] git version: 3739429dd92b92d1b0ab120911a23d50bf03c412
2019-08-20T09:33:20.659+0800 I CONTROL  [initandlisten] allocator: tcmalloc
2019-08-20T09:33:20.659+0800 I CONTROL  [initandlisten] modules: none
2019-08-20T09:33:20.699+0800 I CONTROL  [initandlisten] build environment:
2019-08-20T09:33:20.699+0800 I CONTROL  [initandlisten]     distmod: 2008plus-ssl
2019-08-20T09:33:20.699+0800 I CONTROL  [initandlisten]     distarch: x86_64
2019-08-20T09:33:20.699+0800 I CONTROL  [initandlisten]     target_arch: x86_64
2019-08-20T09:33:20.699+0800 I CONTROL  [initandlisten] options: { storage: { dbPath: "D:\项目\problem_node\data" }, systemLog: { destination: "file", path: "D:\项目\problem_node\log\log.js" } }
2019-08-20T09:33:20.701+0800 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=3530M,session_max=20000,eviction=(threads_min=4,threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),statistics_log=(wait=0),verbose=(recovery_progress),
2019-08-20T09:33:21.093+0800 I STORAGE  [initandlisten] WiredTiger message [1566264801:93600][9304:2006593312], txn-recover: Set global recovery timestamp: 0
2019-08-20T09:33:21.186+0800 I RECOVERY [initandlisten] WiredTiger recoveryTimestamp. Ts: Timestamp(0, 0)
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] 
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] 
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server. 
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP 
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2019-08-20T09:33:21.440+0800 I CONTROL  [initandlisten] 
2019-08-20T09:33:21.441+0800 I CONTROL  [initandlisten] Hotfix KB2731284 or later update is not installed, will zero-out data files.
2019-08-20T09:33:21.441+0800 I CONTROL  [initandlisten] 
2019-08-20T09:33:21.443+0800 I STORAGE  [initandlisten] createCollection: admin.system.version with provided UUID: 045c0a6e-8fe2-4345-a6f7-6ea308e0bff2
2019-08-20T09:33:21.606+0800 I COMMAND  [initandlisten] setting featureCompatibilityVersion to 4.0
2019-08-20T09:33:21.610+0800 I STORAGE  [initandlisten] createCollection: local.startup_log with generated UUID: 3f3cd03c-7d95-4a62-9d13-8b7791140866
2019-08-20T09:33:23.366+0800 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory 'D:/项目/problem_node/data/diagnostic.data'
2019-08-20T09:33:23.369+0800 I NETWORK  [initandlisten] waiting for connections on port 27017
2019-08-20T09:33:23.369+0800 I STORAGE  [LogicalSessionCacheRefresh] createCollection: config.system.sessions with generated UUID: 2e512574-9e06-4bd6-acf8-dec70490fc61
2019-08-20T09:33:23.635+0800 I INDEX    [LogicalSessionCacheRefresh] build index on: config.system.sessions properties: { v: 2, key: { lastUse: 1 }, name: "lsidTTLIndex", ns: "config.system.sessions", expireAfterSeconds: 1800 }
2019-08-20T09:33:23.635+0800 I INDEX    [LogicalSessionCacheRefresh] 	 building index using bulk method; build may temporarily use up to 500 megabytes of RAM
2019-08-20T09:33:23.644+0800 I INDEX    [LogicalSessionCacheRefresh] build index done.  scanned 0 total records. 0 secs
2019-08-20T09:33:23.645+0800 I COMMAND  [LogicalSessionCacheRefresh] command config.$cmd command: createIndexes { createIndexes: "system.sessions", indexes: [ { key: { lastUse: 1 }, name: "lsidTTLIndex", expireAfterSeconds: 1800 } ], $db: "config" } numYields:0 reslen:114 locks:{ Global: { acquireCount: { r: 2, w: 2 } }, Database: { acquireCount: { w: 2, W: 1 } }, Collection: { acquireCount: { w: 2 } } } protocol:op_msg 275ms
