'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
function QuestionList({ formData, onCreateLink}) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      GenerateQuestionlist();
    }
  }, [formData]);

  const GenerateQuestionlist = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', { ...formData });

      console.log("Generated Questions:", result.data.content);

      let content = result.data.content?.trim();
      if (!content) throw new Error("Empty content from AI");

      // Clean ```json code blocks
      content = content.replace(/^```json\s*/i, '').replace(/```$/, '').trim();

      const parsed = JSON.parse(content);
      setQuestionList(parsed.interviewQuestions || []);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast.error("Server Error while generating questions");
    } finally {
      setLoading(false);
    }
  };
  const onFinsh = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select()
      setSaveLoading(false);
      onCreateLink(interview_id);
  }

  return (
    <div>
      {loading && (
        <div className="flex items-center gap-4 mt-10 bg-card p-5 rounded-xl border border-gray-100">
          <Loader2Icon className="animate-spin w-7 h-7 text-white" />
          <div className="flex flex-col gap-2 items-start text-center">
            <h2 className="font-semibold text-lg text-card-foreground">
              Generating Interview Questions
            </h2>
            <p className="text-muted-foreground text-left">
              Our AI is crafting personalized questions based on your job position
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <>
          <QuestionListContainer questionList={questionList} />
          <div className='flex justify-end mt-5'>
            <Button onClick={() => onFinsh()}>
              {saveLoading && <Loader2 className='animate-spin mr-2' />}
              Create Interview Link & Finish
            </Button>
          </div>
        </>
      )}

    </div>
  );
}

export default QuestionList;
