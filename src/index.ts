import { of, from, interval } from 'rxjs';
import { take } from 'rxjs/operators';

// show cases
of([0, 1, 2, 3]).subscribe(console.log);
from([0, 1, 2, 3]).subscribe(console.log);
interval(500).pipe(take(4)).subscribe(console.log);
