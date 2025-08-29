<!-- BEGIN GENERATED: ai-instructions-generator v1.0.0 -->

## Common Design Patterns & Anti-Patterns

### Creational Patterns
- **Factory Pattern**: Use for object creation when type depends on runtime conditions
- **Builder Pattern**: For complex objects with many optional parameters; prefer fluent interfaces
- **Singleton**: Avoid global singletons; use DI containers for single instances instead

### Behavioral Patterns
- **Strategy Pattern**: Replace conditional logic with pluggable algorithms
- **Observer Pattern**: For event-driven architectures; prefer typed events over generic dispatchers
- **Command Pattern**: Encapsulate operations for undo/redo, queuing, or logging
- **Mediator Pattern**: Centralize complex communications between objects; reduce coupling
- **Chain of Responsibility**: Pass requests through handler chain; allow multiple processors
- **Template Method**: Define algorithm skeleton; let subclasses override specific steps
- **State Pattern**: Change object behavior when internal state changes; avoid conditional logic
- **Visitor Pattern**: Add operations to object structures without modifying classes
- **Iterator Pattern**: Provide sequential access without exposing internal structure

### Structural Patterns
- **Adapter Pattern**: Wrap third-party APIs to isolate dependencies
- **Decorator Pattern**: Add behavior without inheritance; prefer composition
- **Repository Pattern**: Abstract data access; keep queries simple and focused
- **Facade Pattern**: Provide simplified interface to complex subsystem
- **Proxy Pattern**: Control access to objects; lazy loading, caching, security
- **Composite Pattern**: Treat individual objects and compositions uniformly
- **Bridge Pattern**: Separate abstraction from implementation; vary independently
- **Flyweight Pattern**: Share common data efficiently; minimize memory usage

### Modern Application Patterns
- **CQRS (Command Query Responsibility Segregation)**: Separate read/write models
- **Event Sourcing**: Store state changes as sequence of events; full audit trail
- **Saga Pattern**: Manage distributed transactions across microservices
- **Unit of Work**: Track changes and commit as single transaction
- **Specification Pattern**: Encapsulate business rules; combine with boolean logic
- **MVC/MVP/MVVM**: Separate presentation, business logic, and data concerns
- **Dependency Injection**: Invert control of dependencies; improve testability
- **Plugin Architecture**: Extend functionality through loadable modules

### Common Anti-Patterns to Avoid
- **God Objects**: Classes with too many responsibilities; break into focused components
- **Anemic Domain Model**: Business logic scattered in services; move logic into domain entities
- **Magic Numbers/Strings**: Use named constants or enums; make intent clear
- **Deep Nesting**: Extract methods; use early returns; prefer guard clauses
- **Feature Envy**: Methods that access other objects' data excessively; consider moving logic
- **Primitive Obsession**: Use value objects instead of raw primitives for domain concepts
- **Copy-Paste Programming**: Extract shared logic into reusable functions/utilities

### Error Handling Patterns
- **Fail Fast**: Validate inputs early; throw meaningful exceptions at boundaries
- **Circuit Breaker**: Prevent cascading failures in distributed systems
- **Retry with Backoff**: Handle transient failures gracefully with exponential backoff
- **Result Pattern**: Return success/error objects instead of throwing for expected failures

### Naming Conventions
- **Classes**: PascalCase, noun phrases describing what they represent
- **Methods**: camelCase, verb phrases describing what they do
- **Variables**: camelCase, descriptive names avoiding abbreviations
- **Constants**: UPPER_SNAKE_CASE for module-level constants
- **Booleans**: is/has/can/should prefixes for clarity

<!-- END GENERATED -->