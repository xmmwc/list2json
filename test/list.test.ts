import { list2Json } from "../src/list2json";

const content = `ID     Done       Have  ETA           Up    Down  Ratio  Status       Name
1   100%   16.83 GB  Done         0.0     0.0    1.0  Finished     Cold.Blood.2019.1080p.BluRay.REMUX.AVC.DTS-HD.MA.5.1-FGT
2   100%    9.70 GB  Done         0.0     0.0    1.0  Finished     A.I.Rising.2018.1080p.BluRay.x264.DTS-HD.MA.5.1-CHD
Sum:          26.53 GB               0.0     0.0`;

const result = list2Json(content, 0, true);

console.log(result);
