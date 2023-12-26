// module-augmentations/date-wizard/index.d.ts
import 'date-wizard';

declare module 'date-wizard' {
    interface DateDetails {
        year: number;
        month: number;
        date: number;
        hours: number;
        minutes: number;
        seconds: number;
    }

    function pad(input: number): string;
}
