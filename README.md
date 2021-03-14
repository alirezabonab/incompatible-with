# InCompatibleWith 
InCompatibleWith is a decorator for class-validator that checks if siblings are not exist on object.

### Use case:

InCompatibleWith checks if other properties exist on an object or not.
In this case we want to have either `status` or `deleted` on the instance of class. If both exist it will complain.

```typescript
class UpdateUserDTO {
  @IsString()
  @IncompatibleWith(['deleted'])
  readonly status: string;

  @IsBoolean()
  @IncompatibleWith(['status'])
  readonly deleted: boolean;

  @IsString()
  readonly name: string;
}
```


### Invalid Object
```json
const obj = {
  status: 'test',
  deleted: true,
  name: 'john',
};
```

### Valid Object
```json
const obj = {
  deleted: true,
  name: 'john',
};
```
Or
```json
const obj = {
  status: 'test',
  name: 'john',
};
```