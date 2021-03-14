# InCompatibleWith 
InCompatibleWith is a decorator for class-validator that checks if siblings are not exist on object.

### Installation

```
  npm i incompatiblewith
```

### Argument

  @IncompatibleWith accepts an array of siblings name in string.
  ```
    @IncompatibleWith (siblingPropsName: string[])
  ```

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
```typescript
const obj = {
  status: 'test',
  deleted: true,
  name: 'john',
};
```

### Valid Object
```typescript
const obj = {
  deleted: true,
  name: 'john',
};
```
Or
```typescript
const obj = {
  status: 'test',
  name: 'john',
};
```