<!-- BEGIN GENERATED: ai-instructions-generator v1.0.0 -->

## Concurrency & Async Patterns

### Thread Safety Patterns
- **Immutable Objects**: Share safely between threads; no synchronization needed
- **Thread-Local Storage**: Isolate mutable state per thread
- **Actor Model**: Encapsulate state; communicate via message passing
- **Lock-Free Algorithms**: Use atomic operations; avoid blocking
- **Copy-on-Write**: Share data until modification needed; then copy

### Async/Await Patterns
- **ConfigureAwait(false)**: In libraries to avoid deadlocks (C#/.NET)
- **Task Composition**: Combine multiple async operations efficiently
- **Cancellation Tokens**: Support operation cancellation; resource cleanup
- **Async Enumerable**: Stream processing with async iteration
- **Error Propagation**: Handle async exceptions properly; avoid silent failures

### Producer-Consumer Patterns
- **Channel/Queue-based**: Decouple producers from consumers
- **Backpressure Handling**: Prevent memory overflow under high load
- **Batch Processing**: Group items for efficient processing
- **Work Distribution**: Balance load across multiple consumers
- **Flow Control**: Throttling, rate limiting, circuit breakers

### Reactive Programming Patterns
- **Observable Streams**: React to data changes; functional composition
- **Hot vs Cold Observables**: Understand subscription semantics
- **Error Handling**: Graceful error propagation and recovery
- **Resource Management**: Proper subscription cleanup; avoid memory leaks
- **Stream Operations**: Map, filter, reduce, merge, debounce, throttle

<!-- END GENERATED -->