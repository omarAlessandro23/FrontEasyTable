export class Schedule {
    scheduleId: number = 0;
    dayOfWeek: number = 0;
    openTime: string = '00:00';  // Representado como string para manejar el formato "HH:mm"
    closeTime: string = '00:00'; // Representado como string para manejar el formato "HH:mm"
}