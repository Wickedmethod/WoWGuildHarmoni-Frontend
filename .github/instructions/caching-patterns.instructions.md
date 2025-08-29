<!-- BEGIN GENERATED: ai-instructions-generator v1.0.0 -->

## Caching & Performance Patterns

### Caching Strategies
- **Cache-Aside**: Application manages cache; good for read-heavy workloads
- **Write-Through**: Update cache and database simultaneously; ensures consistency
- **Write-Behind**: Update cache first, database later; better performance, eventual consistency
- **Refresh-Ahead**: Proactively refresh cache before expiration

### Cache Levels
- **Browser Cache**: HTTP headers for static assets; CDN for global distribution
- **Application Cache**: In-memory for frequently accessed data; Redis for distributed
- **Database Cache**: Query result caching; proper indexing strategies
- **CPU Cache**: Data locality; minimize memory allocations in hot paths

### Performance Anti-Patterns
- **Premature Optimization**: Measure first; optimize proven bottlenecks
- **N+1 Queries**: Batch database operations; use eager loading judiciously
- **Memory Leaks**: Dispose resources; unsubscribe from events; clear timers
- **Blocking I/O**: Use async patterns for network/file operations
- **Large Object Graphs**: Lazy loading; pagination for collections

### Monitoring & Observability
- **Metrics**: Response times, throughput, error rates, resource utilization
- **Logging**: Structured logs with correlation IDs; proper log levels
- **Tracing**: Request flow through distributed systems; performance bottlenecks
- **Alerts**: Proactive monitoring; SLAs and error thresholds

<!-- END GENERATED -->