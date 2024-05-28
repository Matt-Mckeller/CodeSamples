import { TICKET_POINT_OPTIONS, TICKET_POINT_VALUES } from "../"

export const TICKET_POINT_OPTIONS_MAP = {
  [TICKET_POINT_OPTIONS.ONE_POINT]: TICKET_POINT_VALUES.ONE_POINT,
  [TICKET_POINT_OPTIONS.TWO_POINTS]: TICKET_POINT_VALUES.TWO_POINTS,
  [TICKET_POINT_OPTIONS.THREE_POINTS]: TICKET_POINT_VALUES.THREE_POINTS,
  [TICKET_POINT_OPTIONS.FIVE_POINTS]: TICKET_POINT_VALUES.FIVE_POINTS,
  [TICKET_POINT_OPTIONS.NINE_POINTS]: TICKET_POINT_VALUES.NINE_POINTS,
  [TICKET_POINT_OPTIONS.EIGHTEEN_POINTS]: TICKET_POINT_VALUES.EIGHTEEN_POINTS,
  [TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS]:
    TICKET_POINT_VALUES.EIGHTY_ONE_POINTS,
}

// Overload example, probably unnecessary
export function mapTicketPointToValue(pointValues: TICKET_POINT_OPTIONS): number
export function mapTicketPointToValue(
  pointValues: TICKET_POINT_OPTIONS[],
): number[]
export function mapTicketPointToValue(
  pointValues: TICKET_POINT_OPTIONS | TICKET_POINT_OPTIONS[],
): number | number[] {
  const mapPointValue = (pointValue: TICKET_POINT_OPTIONS): number => {
    switch (pointValue) {
      case TICKET_POINT_OPTIONS.ONE_POINT:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.ONE_POINT
        ] as unknown as number
      case TICKET_POINT_OPTIONS.TWO_POINTS:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.TWO_POINTS
        ] as unknown as number
      case TICKET_POINT_OPTIONS.THREE_POINTS:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.THREE_POINTS
        ] as unknown as number
      case TICKET_POINT_OPTIONS.FIVE_POINTS:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.FIVE_POINTS
        ] as unknown as number
      case TICKET_POINT_OPTIONS.NINE_POINTS:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.NINE_POINTS
        ] as unknown as number
      case TICKET_POINT_OPTIONS.EIGHTEEN_POINTS:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.EIGHTEEN_POINTS
        ] as unknown as number
      case TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS:
        return TICKET_POINT_OPTIONS_MAP[
          TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS
        ] as unknown as number
      default:
        return -1
    }
  }

  if (Array.isArray(pointValues)) {
    return pointValues.map(mapPointValue)
  }
  return mapPointValue(pointValues)
}

export const getPointDifficultyLabel = (
  pointValue: TICKET_POINT_OPTIONS,
): string => {
  switch (pointValue) {
    case TICKET_POINT_OPTIONS.ONE_POINT:
      return "EASY"
    case TICKET_POINT_OPTIONS.TWO_POINTS:
      return "EASY"
    case TICKET_POINT_OPTIONS.THREE_POINTS:
      return "MEDIUM"
    case TICKET_POINT_OPTIONS.FIVE_POINTS:
      return "MEDIUM"
    case TICKET_POINT_OPTIONS.NINE_POINTS:
      return "HARD"
    case TICKET_POINT_OPTIONS.EIGHTEEN_POINTS:
      return "HARD"
    case TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS:
    default:
      return "UNKNOWN"
  }
}
