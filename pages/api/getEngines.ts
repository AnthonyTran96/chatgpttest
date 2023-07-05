import { NextApiRequest, NextApiResponse } from 'next';
import modelQuery from '@/lib/openai/modelQuery';

type Option = {
    value: string;
    label: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const models = await modelQuery();
    const modelOptions: Option[] = models.map((model) => {
        return {
            value: model.id,
            label: model.id,
        };
    });
    modelOptions.length === 0 || !models
        ? res.status(500).json({ error: 'Failed to get Models!' })
        : res.status(200).json({
              modelOptions,
          });
}
