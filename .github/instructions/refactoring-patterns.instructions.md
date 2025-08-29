<!-- BEGIN GENERATED: ai-instructions-generator v1.0.0 -->

## Refactoring Patterns & Code Quality

### When to Refactor
- **Red-Green-Refactor**: Refactor after tests pass; keep changes small and focused
- **Boy Scout Rule**: Leave code cleaner than you found it; fix small issues while there
- **Preparatory Refactoring**: Make change easy, then make the easy change

### Refactoring Techniques
- **Extract Method**: Break long functions into smaller, named pieces
- **Extract Class**: When a class has too many responsibilities
- **Inline Temp**: Remove unnecessary temporary variables that don't add clarity
- **Replace Temp with Query**: Calculate values on demand instead of storing
- **Replace Conditional with Polymorphism**: Use inheritance/interfaces for type-specific behavior

### Code Smells to Address
- **Long Methods**: Should fit on screen; extract logical chunks
- **Large Classes**: Split by responsibility; use composition
- **Duplicated Code**: Extract into shared functions/utilities
- **Data Clumps**: Group related parameters into objects/structs
- **Shotgun Surgery**: Changes scattered across many files; consolidate related logic

### Quality Metrics to Monitor
- **Cyclomatic Complexity**: Keep methods under 10; extract complex conditions
- **Coupling**: Minimize dependencies between modules; prefer interfaces
- **Cohesion**: Keep related functionality together; split unrelated concerns
- **Test Coverage**: Aim for 80%+ line coverage; focus on critical paths

<!-- END GENERATED -->